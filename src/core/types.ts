/*
 * @Descripttion:
 * @Author: KuuBee
 * @Date: 2021-10-28 16:31:54
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-10-29 14:14:24
 */

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
type InlineEleType = "p" | "img" | "link" | "code" | "em" | "strong";
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

export class InlineEle {
  constructor(
    public type: InlineEleType,
    public content: string | InlineEle,
    public attr?: Record<string, string>
  ) {}
}
export class BlockEle {
  constructor(public type: BlockEleType, public content: string | InlineEle) {}
}
export class TableEle extends BlockEle {
  constructor(
    public headers: InlineEle[],
    public rows: InlineEle[],
    public align: ("statr" | "center" | "end")[]
  ) {
    super("table", "");
  }
}
export class InlineCodeEle extends InlineEle {
  constructor(public content: string) {
    super("code", content);
  }
}
export class BlockCodeEle extends BlockEle {
  constructor(public content: string, public language: string) {
    super("code", content);
  }
}
