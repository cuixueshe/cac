import mri from 'mri'
import { Command, CommandConfig, GlobalCommand } from './Command'
import { Option, OptionConfig } from './Option'

interface ParsedArgv {
  args: ReadonlyArray<string>
  options: {
    [k: string]: any
  }
}
class CAC {
  commands: Command[]
  private globalCommand: Command
  matchedCommand?: Command
  // matchedCommandName?: string
  args: ParsedArgv['args']
  options: ParsedArgv['options']
  constructor() {
    this.commands = []
    this.args = []
    this.options = {}
    this.globalCommand = new GlobalCommand(this)
  }

  option (name: string, description: string, config?: OptionConfig) {
    this.globalCommand.option(name, description, config)
  }

  command (name: string, description?: string, config?: CommandConfig) {
    const command = new Command(name, description || '', config, this)
    this.commands.push(command)
    return command
  }

  parse (rawArrs: string[]): ParsedArgv {
    // 1. 解析 rawArrs 从里面拿出值来
    // 2. 从 globalCommand 里面拿出 option 去 rawArrs 里面有没有
    // 3. 有的话 那么就赋值输出给 options
    // 4. todo 没有的话 那么就进入到 args 里面
    const mriResult = mri(rawArrs)
    const options = this.globalCommand.options.reduce(
      (options, option: Option) => {
        const key =
          option.name in mriResult
            ? option.name
            : option.name.replace(/([A-Z])/, (_, $1) => `-${$1.toLowerCase()}`)

        const result = mriResult[key]
        const isUndefined = result === undefined

        options[option.name] = isUndefined ? option.config.default : result
        return options
      },
      {}
    )

    this.options = options

    for (const command of this.commands) {
      const parsed = this.mri(rawArrs.slice(2), command)

      const commandName = parsed.args[0]
      if (command.isMatched(commandName)) {
        const parsedInfo = {
          ...parsed,
          args: parsed.args.slice(1),
        }
        this.setParsedInfo(parsedInfo, command)
      }
    }

    this.runMatchCommand()

    return {
      args: [],
      options: {
        ...this.options,
        '--': []
      }
    }
  }

  private mri (
    argv: string[],
    command?: Command
  ) {

    let parsed = mri(argv)

    const args = parsed._

    const options: {
      [k: string]: any
    } = {}

    for (const key of Object.keys(parsed)) {
      if (key !== '_') {
        options[key] = parsed[key]
      }
    }

    return {
      args,
      options
    }
  }

  private setParsedInfo (
    { args, options }: ParsedArgv,
    matchedCommand?: Command
  ) {
    this.args = args
    this.options = options
    if (matchedCommand) {
      this.matchedCommand = matchedCommand
    }

    return this
  }

  runMatchCommand () {
    const { args, options, matchedCommand: command } = this

    if (!command || !command.commandAction) return

    const actionArgs: any[] = []
    command.args.forEach((arg, index) => {
      actionArgs.push(args[index])
    })
    actionArgs.push(options)
    return command.commandAction.apply(this, actionArgs)
  }
}

export default CAC
