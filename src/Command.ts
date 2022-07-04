import Option from './Option';

export class Command {
  public options: Option[];
  constructor() {
    this.options = [];
  }
  option(name: string, description: string) {
    const option = new Option(name, description);
    this.options.push(option);
  }
}
