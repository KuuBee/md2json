/*
 * @Descripttion: 图片规则的测试
 * @Author: KuuBee
 * @Date: 2021-10-29 13:53:23
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-10-29 13:53:23
 */

import { alt, src, title } from "./index.spec";
import { imgRule } from "../../src/core/inline-rule";
import { InlineEle } from "../../src/core/types";

// 图片语句
const imageEG1 = `![${alt}](${src})`,
  imageEG2 = `![${alt}](${src} "${title}")`,
  imageEG3 = `![${alt}](${src} '${title}')`;

test("imgRule test", () => {
  expect(imgRule(imageEG1)).toEqual(
    new InlineEle("img", "", {
      src,
      alt,
      title: ""
    })
  );
  expect(imgRule(imageEG2)).toEqual(
    new InlineEle("img", "", {
      src,
      alt,
      title
    })
  );
  expect(imgRule(imageEG3)).toEqual(
    new InlineEle("img", "", {
      src,
      alt,
      title
    })
  );
});
