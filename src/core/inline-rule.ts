/*
 * @Descripttion:
 * @Author: KuuBee
 * @Date: 2021-10-28 16:31:44
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-10-28 16:35:27
 */

import { InlineCodeEle, InlineEle } from "./types";

// img
const imgRule = (str: string) => {
  const res = str.match(/^\!\[(.*?)\]\((.*?)(?:\s[\"\'](.*?)[\"\'])?\)/i);
  if (!res) return null;
  const [, alt, src, title] = Array.from(res);
  return new InlineEle("img", "", {
    src,
    alt,
    title
  });
};
// link
const linkRule = (str: string) => {
  const res = str.match(
    /(?:\[(.*?)\]\((.*?)(?:\s[\"\'](.*?)[\"\'])?\))|(?:<(.*?)>)/i
  );
  if (!res) return null;
  const [, content, src, title, src2] = Array.from(res);
  return new InlineEle("link", inlineParser(content) ?? src2, {
    src: src ?? src2,
    title
  });
};
// code
const inlineCodeRule = (str: string) => {
  const res = str.match(/`([^`]*?)`/i);
  if (!res) return null;
  const [, content] = Array.from(res);
  return new InlineCodeEle(content);
};

export const inlineParser = (content: string): InlineEle | string => {
  let res: InlineEle | string = content;
  for (let i = 0; i < inlineRuleList.length; i++) {
    const fn = inlineRuleList[i];
    res = fn(content);
    if (res) break;
  }
  return res;
};

export const inlineRuleList = [imgRule, linkRule, inlineCodeRule];
