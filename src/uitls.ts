export const removeBrackets = (v: string) => v.replace(/[<[].+/, '').trim()

const parseBrackets = (match: string[]) => {
  let variadic = false
  let value = match[1]
  if (value.startsWith('...')) {
    value = value.slice(3)
    variadic = true
  }
  return {
    required: match[0].startsWith('<'),
    value,
    variadic
  }
}

export const findAllBrackets = (v: string) => {
  const ANGLED_BRACKET_RE_GLOBAL = /<([^>]+)>/g
  const SQUARE_BRACKET_RE_GLOBAL = /\[([^\]]+)\]/g

  const res = []

  let angledMatch
  while ((angledMatch = ANGLED_BRACKET_RE_GLOBAL.exec(v))) {
    res.push(parseBrackets(angledMatch))
  }

  let squareMatch
  while ((squareMatch = SQUARE_BRACKET_RE_GLOBAL.exec(v))) {
    res.push(parseBrackets(squareMatch))
  }

  return res
}