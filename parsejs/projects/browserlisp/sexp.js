// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["_", "sexps", "_"]},
    {"name": "sexps", "symbols": ["sexp"]},
    {"name": "sexps", "symbols": ["sexp", "__", "sexps"]},
    {"name": "sexp", "symbols": ["list"]},
    {"name": "sexp", "symbols": ["atom"]},
    {"name": "list", "symbols": [{"literal":"("}, "_", {"literal":")"}]},
    {"name": "list", "symbols": [{"literal":"("}, "_", "sexps", "_", {"literal":")"}]},
    {"name": "atom$ebnf$1", "symbols": [/[a-z]/]},
    {"name": "atom$ebnf$1", "symbols": ["atom$ebnf$1", /[a-z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "atom", "symbols": ["atom$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [/[\s]/]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
