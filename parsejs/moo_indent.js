// https://gist.github.com/nathan/d8d1adea38a1ef3a6d6a06552da641aa
const moo = require('moo')

const lexer = moo.compile({
  ws: /[ \t]+/,
  nl: { match: /(?:\r\n?|\n)+/, lineBreaks: true },
  id: /\w+/,
})

// example

const tokens = indented(lexer, `
if this
  if that
    another
else
  there
`)

for (const tok of tokens) console.log(tok)

// implementation

function* indented(lexer, source) {
  let iter = peekable(lexer.reset(source))
  let stack = []

  // absorb initial blank lines and indentation
  let indent = iter.nextIndent()

  for (let tok; tok = iter.next(); ) {
    if (tok.type === 'nl') {
      const newIndent = iter.nextIndent()
      if (newIndent == null) break // eof

      if (newIndent === indent) {
        yield {type: 'nl'}

      } else if (newIndent > indent) {
        stack.push(indent)
        indent = newIndent
        yield {type: 'indent'}

      } else {
        while (newIndent < indent) {
          indent = stack.pop()
          yield {type: 'dedent'}
        }
        if (newIndent !== indent) {
          throw new Error('inconsistent indentation')
        }
      }
      indent = newIndent

    // ignore whitespace within lines
    } else if (tok.type !== 'ws') {
      yield tok
    }
  }

  // dedent remaining blocks at eof
  for (let i = stack.length; i--;) {
    yield {type: 'dedent'}
  }
}

function peekable(lexer) {
  let here = lexer.next()
  return {
    next() {
      const old = here
      here = lexer.next()
      return old
    },
    peek() {
      return here
    },
    nextIndent() {
      for (let tok; tok = this.peek(); ) {
        if (tok.type === 'nl') {
          this.next()
          continue
        }
        if (tok.type === 'ws') {
          const indent = tok.value.length
          this.next()

          const next = this.peek()
          if (!next) return
          if (next.type === 'nl') {
            this.next()
            continue
          }
          return indent
        }
        return 0
      }
    },
  }
}
