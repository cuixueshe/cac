import CAC from './CAC'
import { Option, OptionConfig } from './Option'
import { findAllBrackets, removeBrackets } from './uitls'

interface CommandConfig {
  allowUnknownOptions?: boolean
  ignoreOptionDefaultValue?: boolean
}

interface CommandArg {
  required: boolean
  value: string
}

export class Command {
  public options: Option[]
  name: string
  args: CommandArg[]
  commandAction?: (...args: any[]) => any
  constructor(
    public rawName: string,
    public description: string,
    public config: CommandConfig = {},
    public cli: CAC
  ) {
    this.name = removeBrackets(rawName)
    this.args = findAllBrackets(rawName)
    this.options = []
  }

  option (name: string, description: string, config?: OptionConfig) {
    const option = new Option(name, description, config)
    this.options.push(option)
    return this
  }

  action (callback: (...args: any[]) => any) {
    this.commandAction = callback
    return this
  }

  isMatched (name: string) {
    return this.name === name
  }
}

class GlobalCommand extends Command {
  constructor(cli: CAC) {
    super('@@global@@', '', {}, cli)
  }
}

export type { CommandConfig }

export { GlobalCommand }