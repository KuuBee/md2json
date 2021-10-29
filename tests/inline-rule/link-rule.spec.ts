/*
 * @Descripttion: 链接规则的测试
 * @Author: KuuBee
 * @Date: 2021-10-29 13:54:55
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-10-29 14:00:48
 */

import { src, content, title } from "./index.spec";
import { linkRule } from "../../src/core/inline-rule";
import { InlineEle } from "../../src/core/types";

// 链接语句
const eg1 = `[aa[bb](baidu.com)a](${src})`,
  eg2 = `[${content}](${src})`,
  eg3 = `[${content}](${src} '${title}')`,
  eg4 = `[aa ![222](https://steamuserimages-a.akamaihd.net/ugc/81464671841976045/1F05AE98A3F94EA89D54842993E3E6477EA74785/)a](${src})`;
test("linkRule test", () => {
  expect(linkRule(eg1)).toEqual(
    new InlineEle("link", "aa[bb](baidu.com)a", {
      src,
      title: ""
    })
  );
  expect(linkRule(eg2)).toEqual(
    new InlineEle("link", content, {
      src,
      title: ""
    })
  );
  expect(linkRule(eg3)).toEqual(
    new InlineEle("link", content, {
      src,
      title
    })
  );
  expect(linkRule(eg4)).toEqual(
    new InlineEle(
      "link",
      // TODO 这里还是要改的
      new InlineEle("img", "", {
        src: "https://steamuserimages-a.akamaihd.net/ugc/81464671841976045/1F05AE98A3F94EA89D54842993E3E6477EA74785/",
        alt: "222",
        title: ""
      }),
      {
        src,
        title: ""
      }
    )
  );
});
