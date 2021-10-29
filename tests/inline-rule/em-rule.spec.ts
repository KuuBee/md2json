/*
 * @Descripttion:
 * @Author: KuuBee
 * @Date: 2021-10-29 14:39:53
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-10-29 16:29:23
 */
import { emRule } from "../../src/core/inline-rule";
import { InlineEle } from "../../src/core/types";
import { content } from "./index.spec";

const eg1 = `_${content}_`,
  eg2 = `*${content}*`,
  eg3 = `__${content}__`;
test("em test", () => {
  expect(emRule(eg1)).toEqual(new InlineEle("em", content));
  expect(emRule(eg2)).toEqual(new InlineEle("em", content));
  expect(emRule(eg3)).toEqual(new InlineEle("em", content));
});
