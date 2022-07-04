import { removeBrackets, camelcaseOptionName } from './utils';

interface OptionConfig {
  default?: any;
  type?: any[];
}

export default class Option {
  name: string; // Option 名字
  names: string[]; // Option 名字 & 别名
  negated: boolean = false; // 判断
  config: OptionConfig;
  required?: boolean; // 是否为必须的参数
  isBoolean?: boolean;

  constructor(
    public rawName: string,
    public description: string,
    config?: OptionConfig
  ) {
    this.config = Object.assign({}, config);

    // 处理 Dot-nested Options 的情况，只获取 OptionName
    rawName = rawName.replace(/\.\*/g, '');

    // e.g：'-r, --recursive'
    // 1、['-r', '--recursive']
    // 2、去掉'-'或'--'开头，得到['r', 'recursive']
    // 3、对（2）中的结果进行驼峰式处理
    // 4、排序处理，获取最长的 name，即排序后的最后一个，座位实际的 OptionName
    this.names = removeBrackets(rawName)
      .split(',')
      .map((v: string) => {
        let name = v.trim().replace(/^-{1,2}/, '');
        if (name.startsWith('no-')) {
          this.negated = true;
          name = name.replace(/^no-/, '');
        }
        return camelcaseOptionName(name);
      })
      .sort((a, b) => (a.length > b.length ? 1 : -1));

    this.name = this.names[this.names.length - 1];

    if (this.negated && this.config.default == null) {
      this.config.default = true;
    }

    if (rawName.includes('<')) {
      // <xxx>: string/number;
      this.required = true;
    } else if (rawName.includes('[')) {
      // [xxx]: string/number/true
      this.required = false;
    } else {
      // 不需要传参，默认为布尔值
      this.isBoolean = true;
    }
  }
}
