import { describe, expect, test } from 'vitest';
import { removeBrackets, camelcaseOptionName } from '../src/utils';

describe('utils tests', () => {
  test('removeBrackets', () => {
    // e.g：'rm <dir>' -> rm
    // reg: /[<[].+/ -> 匹配'<'或'['开始，后面至少含有一个非结束的字符，然后再遇到'>'或']'结束匹配，即上述中的'<dir>'
    const rawName = 'rm <dir>';

    expect(removeBrackets(rawName)).toEqual('rm');
  });

  test('camelcaseOptionName', () => {
    // e.g: '--clear-screen' -> --clearScreen
    const rawName = '--clear-screen';

    expect(camelcaseOptionName(rawName)).toEqual('--clearScreen');

    // Dot-nested Options
    // e.g: '--env-config.API_SECRET' -> '--envConfig.API_SECRET'
    const dotNestedName = '--env-config.API_SECRET';
    expect(camelcaseOptionName(dotNestedName)).toEqual(
      '--envConfig.API_SECRET'
    );
  });
});
