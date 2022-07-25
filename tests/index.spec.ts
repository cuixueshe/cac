import { test, expect, vi } from 'vitest'
import { cac } from '../src'

test('basic-usage', () => {
  const cli = cac()

  cli.option('--type <type>', 'Choose a project type')

  // process.argv
  // 前2个值不需要关心
  const parsed = cli.parse(['', '', '--type', 'foo'])
  expect(parsed).toEqual({
    args: [],
    options: {
      type: 'foo',
      '--': []
    }
  })
})

test('type value should be equal to node', () => {
  const cli = cac()

  cli.option('--type <type>', 'Choose a project type', {
    default: 'node'
  })

  // process.argv
  // 前2个值不需要关心
  const parsed = cli.parse(['', ''])
  expect(parsed).toEqual({
    args: [],
    options: {
      type: 'node',
      '--': []
    }
  })
})

test('square Brackets in option name', () => {
  const cli = cac()
  cli.option('--name [name]', 'Provide your name')

  // process.argv
  // 前2个值不需要关心
  const parsed = cli.parse(['', '', '--name'])
  expect(parsed).toEqual({
    args: [],
    options: {
      name: true,
      '--': []
    }
  })
})

test('kebab-case in option name', () => {
  const cli = cac()
  cli.option('--clear-screen [clearScreen]', 'Clear screen')

  // process.argv
  // 前2个值不需要关心
  const parsed = cli.parse(['', '', '--clear-screen'])
  expect(parsed).toEqual({
    args: [],
    options: {
      clearScreen: true,
      '--': []
    }
  })
})

test('negated option validation', () => {
  const cli = cac()

  cli.option('--config <config>', 'config file')
  cli.option('--no-config', 'no config file')

  const { options } = cli.parse(['', '', '--no-config'])
  expect(options.config).toBe(false)
})

test('command action callback', () => {
  const cli = cac()

  const obj = { fn () { } }
  const fn = vi.spyOn(obj, 'fn')

  cli
    .command('build [entry]', 'Build your app')
    .option('--config <configFlie>', 'Use config file for building', {
      type: [String],
    })
    .option('--scale [level]', 'Scaling level')
    .action(obj.fn)

  const { options } = cli.parse(
    `node bin build app.js --config config.js --scale`.split(' ')
  )

  expect(fn).toHaveBeenCalled()
  expect(options.config).toEqual('config.js')
  expect(options.scale).toEqual(true)
})