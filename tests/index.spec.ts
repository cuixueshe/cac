import { test, expect } from 'vitest';
import { cac } from '../src';

test('basic-usage', () => {
  const cli = cac();

  cli.option('--type <type>', 'Choose a project type');

  // process.argv
  // 前2个值不需要关心
  const parsed = cli.parse(['', '', '--type', 'foo']);
  expect(parsed).toEqual({
    args: [],
    options: {
      type: 'foo',
      '--': [],
    },
  });
});

test.todo('type value should be equal to node', () => {
  const cli = cac();

  cli.option('--type <type>', 'Choose a project type', {
    default: 'node',
  });

  // process.argv
  // 前2个值不需要关心
  const parsed = cli.parse(['', '']);
  expect(parsed).toEqual({
    args: [],
    options: {
      type: 'node',
      '--': [],
    },
  });
});

test.todo('square Brackets in option name', () => {
  const cli = cac();
  cli.option('--name [name]', 'Provide your name');

  // process.argv
  // 前2个值不需要关心
  const parsed = cli.parse(['', '', '--name']);
  expect(parsed).toEqual({
    args: [],
    options: {
      name: true,
      '--': [],
    },
  });
});

test('option name without brackets and dashed', () => {
  const cli = cac();
  cli.option('--name [name]', 'Remove recursively');

  const parsed = cli.parse(['', '', '--name']);

  expect(parsed.options).toHaveProperty('name');
});

test('Use the longest name as actual option name', () => {
  const cli = cac();
  cli.option('-r, --recursive', 'Remove recursively');

  const parsed = cli.parse(['', '', '--recursive']);

  expect(parsed.options).toHaveProperty('recursive');
});
