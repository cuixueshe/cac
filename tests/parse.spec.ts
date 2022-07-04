import { expect, test } from "vitest";
import { cac } from "../src";

test.skip("hapy path", () => {
  const cli = cac();

  const rawArrs1 = ["--type", "foo", "bar"];
  expect(cli.parse(rawArrs1)).toEqual({
    args: ["bar"],
    options: {
      type: "foo",
    },
  });

  const rawArrs2 = ["--type", "foo", "name", "--bar", "bar"];
  expect(cli.parse(rawArrs2)).toEqual({
    args: ["name"],
    options: {
      type: "foo",
      bar: "bar",
    },
  });
});