import { test, expect } from "vitest";
import { cac } from "../src";

test("basic-usage", () => {
  const cli = cac();

  cli.option("--type <type>", "Choose a project type");

  // process.argv
  // 前2个值不需要关心
  const parsed = cli.parse(["", "", "--type", "foo"]);
  expect(parsed).toEqual({
    args: [],
    options: {
      type: "foo",
      "--": [],
    },
  });
});

test.todo("type value should be equal to node", () => {
  const cli = cac();

  cli.option("--type <type>", "Choose a project type",{
    default: "node"
  });

  // process.argv
  // 前2个值不需要关心
  const parsed = cli.parse(["", ""]);
  expect(parsed).toEqual({
    args: [],
    options: {
      type: "node",
      "--": [],
    },
  });
});


test.todo('square Brackets in option name', () => {
  const cli = cac();
  cli.option('--name [name]', 'Provide your name')

  // process.argv
  // 前2个值不需要关心
  const parsed = cli.parse(["", "", "--name"]);
  expect(parsed).toEqual({
    args: [],
    options: {
      name: true,
      "--": [],
    },
  });
});


