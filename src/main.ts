/*
 * @Descripttion:
 * @Author: KuuBee
 * @Date: 2021-10-28 16:23:12
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-10-28 16:23:13
 */
function main() {
  console.log("success");
}

type EleType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "blockquote"
  | "img"
  | "ul"
  | "ol"
  | "hr"
  | "code"
  | "table"
  | "link";
type InlineEleType = "p" | "img" | "link" | "code";
type BlockEleType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "blockquote"
  | "ul"
  | "ol"
  | "hr"
  | "table"
  | "code";

class InlineEle {
  constructor(
    public type: InlineEleType,
    public content: string | InlineEle,
    public attr?: Record<string, string>
  ) {}
}
class BlockEle {
  constructor(public type: BlockEleType, public content: string | InlineEle) {}
}
class TableEle extends BlockEle {
  constructor(
    public headers: InlineEle[],
    public rows: InlineEle[],
    public align: ("statr" | "center" | "end")[]
  ) {
    super("table", "");
  }
}
class InlineCodeEle extends InlineEle {
  constructor(public content: string) {
    super("code", content);
  }
}
class BlockCodeEle extends BlockEle {
  constructor(public content: string, public language: string) {
    super("code", content);
  }
}
export class MarkdownParser {
  constructor() {}
  // TODO 改成对象数组 函数+正则
  static inlineRule: ((str: string) => InlineEle | null)[] = [
    // img
    (str: string) => {
      const res = str.match(/^\!\[(.*?)\]\((.*?)(?:\s[\"\'](.*?)[\"\'])?\)/i);
      if (!res) return null;
      const [, alt, src, title] = Array.from(res);
      return new InlineEle("img", "", {
        src,
        alt,
        title
      });
    },
    // link
    (str: string) => {
      const res = str.match(
        /(?:\[(.*?)\]\((.*?)(?:\s[\"\'](.*?)[\"\'])?\))|(?:<(.*?)>)/i
      );
      if (!res) return null;
      const [, content, src, title, src2] = Array.from(res);
      return new InlineEle("link", content ?? src2, {
        src: src ?? src2,
        title
      });
    },
    // code
    (str: string) => {
      const res = str.match(/`([^`]*?)`/i);
      if (!res) return null;
      const [, content] = Array.from(res);
      return new InlineCodeEle(content);
    }
    // p 其他都为空就是p 所以暂时不高
  ];
  static blockRule: ((str: string) => BlockEle | null)[] = [
    // h1-16
    (str: string) => {
      const res = str.match(/(#{1,6})\s(.*?)/i);
      if (!res) return null;
      const [
        ,
        // h1-h6
        level,
        content
      ] = Array.from(res);
      return new BlockEle(`h${level.length}` as BlockEleType, content);
    },
    (str: string) => {
      const res = str.match(/`([^`]*?)`/i);
      if (!res) return null;
      const [, content] = Array.from(res);
      return new BlockEle("blockquote", "");
    }
  ];
  init() {}
}
