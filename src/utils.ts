/**
 * @description: 移除字符串中被 brackets (如 < | [ )包裹的内容，包括 brackets 自身
 * @example
 * return 'rm'
 * removeBrackets('rm <dir>');
 * @param {string} v
 * @return {string}
 */
export const removeBrackets = (v: string) => v.replace(/[<[].+/, '').trim();

/**
 * @description: kebab-case 转 camelCase
 * @example
 * return '--clearScreen'
 * camelcase('--clear-screen');
 * @param {string} v
 * @return {string}
 */
export const camelcase = (v: string) =>
  v.replace(/([a-z])-([a-z])/g, (_, p1, p2) => `${p1}${p2.toUpperCase()}`);

/**
 * @description: 对 OptionName 进行驼峰处理（兼容 Dot-nested 情况，只对非 Dot-nested 的选项进行处理）
 * @example
 * return '--envConfig.API_SECRET'
 * camelcaseOptionName('--env-config.API_SECRET');
 * @param {string} v
 * @return {string}
 */
export const camelcaseOptionName = (name: string) =>
  name
    .split('.')
    .map((v, i) => (i === 0 ? camelcase(v) : v))
    .join('.');
