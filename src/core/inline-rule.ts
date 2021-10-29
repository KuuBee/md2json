/*
 * @Descripttion: 行内语句
 * @Author: KuuBee
 * @Date: 2021-10-28 16:31:44
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-10-29 16:31:58
 */

import { InlineCodeEle, InlineEle } from "./types";

// img
export const imgRule = (str: string): InlineEle | null => {
  const res = str.match(/\!\[(.*?)\]\((.*?)(?:\s[\"\'](.*?)[\"\'])?\)/i);
  if (!res) return null;
  const [, alt, src, title] = res;
  return new InlineEle("img", "", {
    src,
    alt,
    title: title ?? ""
  });
};
// link
export const linkRule = (str: string): InlineEle | null => {
  const res = str.match(
    /(?:^\[(.*)\]\((.*?)(?:\s[\"\'](.*?)[\"\'])?\))|(?:^<(.*?)>)/i
  );
  if (!res) return null;
  const [, content, src, title, src2] = res;
  return new InlineEle("link", inlineParser(content) ?? src2, {
    src: src ?? src2,
    title: title ?? ""
  });
};
// code
export const inlineCodeRule = (str: string): InlineCodeEle | null => {
  const res = str.match(/`([^`]*?)`/i);
  if (!res) return null;
  const [, content] = res;
  return new InlineCodeEle(content);
};
// em
export const emRule = (str: string) => {
  const res = str.match(/[_\*](.*)[_\*]/i);
  if (!res) return null;
  const [, content] = res;
  return new InlineEle("em", content);
};
// strong
export const strongRule = (str: string) => {
  const res = str.match(/[_\*]{2}((?:[^_\*].*)|(?:.*[^_\*]))[_\*]{2}/i);
  if (!res) return null;
  const [, content] = res;
  return new InlineEle("strong", content);
};

export const inlineParser = (content: string): InlineEle | string => {
  let res: InlineEle | string = content;
  for (let i = 0; i < inlineRuleList.length; i++) {
    const fn = inlineRuleList[i];
    res = fn(content) ?? content;
    if (res) break;
  }
  return res;
};

export const inlineRuleList: ((str: string) => InlineEle | null)[] = [
  imgRule,
  linkRule,
  inlineCodeRule,
  emRule,
  strongRule
];
