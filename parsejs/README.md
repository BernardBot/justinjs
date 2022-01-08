# parsejs
Parsing in JavaScipt. We use `nearley` to parse JavaScript.
`nearley.js` is a JavaScript library for parsing and generating grammars.

## Links
source
- https://github.com/kach/nearley
- https://github.com/kach/nearley/tree/master/examples
- https://github.com/kach/nearley/blob/master/lib/nearley-language-bootstrapped.ne

online tools
- https://nearley.js.org/
- https://omrelli.ug/nearley-playground/
- https://nearley.js.org/docs/grammar

indents with moo lexer
- https://gist.github.com/nathan/d8d1adea38a1ef3a6d6a06552da641aa
- https://github.com/no-context/moo

author
- https://cs.stanford.edu/~kach/

other parsing related sources
- https://suif.stanford.edu/dragonbook/lecture-notes/Stanford-CS143/06-Formal-Grammars.pdf

## Useful commands
Installation:
```
npm install -g nearley
```
Compilation:
```
nearleyc csscolor.ne -o csscolor.js
```
Validation:
```
nearley-test -i "#00ff00" csscolor.js
nearley-unparse -n 3 csscolor.js
nearley-railroad csscolor.ne -o csscolor.html
```

## Idioms
Whitespace needs to be explicitly handled with the following
two rules, for possible and present whitespace, respectively.
```
_ -> [\s]:*
__ -> [\s]:+
```
These two rules are also declared in the
[built-ins](https://github.com/kach/nearley/blob/master/builtin/whitespace.ne)
and can be added with the `@builtin` directive.
```
@builtin "whitespace.ne"
```
