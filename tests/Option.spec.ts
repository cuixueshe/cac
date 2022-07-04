import { describe, expect, test } from 'vitest';
import Option from '../src/Option';

describe('Option tests', () => {
  test('happy path', () => {
    const option = new Option('-r, --recursive', 'Remove recursively');

    expect(option.name).toEqual('recursive');
  });

  test('Negated Options', () => {
    const option = new Option('--no-foo', 'Foo Option');

    // To allow an option whose value is false, you need to manually specify a negated option:
    // cli
    //   .command('build [project]', 'Build a project')
    //   .option('--no-config', 'Disable config file')
    //   .option('--config <path>', 'Use a custom config file');
    // This will let CAC set the default value of config to true, and you can use --no-config flag to set it to false.
    expect(option.config.default).toEqual(true);
  });

  test('required', () => {
    const option1 = new Option('--name <name>', 'Provide your name');

    expect(option1.required).toEqual(true);

    const option2 = new Option('--type [type]', 'Choose a project type');

    expect(option2.required).toEqual(false);
  });

  test('isBoolean', () => {
    const option = new Option('--no-foo', 'Foo Option');

    expect(option.isBoolean).toEqual(true);
  });
});
