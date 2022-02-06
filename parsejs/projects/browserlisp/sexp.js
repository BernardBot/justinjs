// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["_", "sexps", "_"], "postprocess": d => d[1]},
    {"name": "sexps", "symbols": ["sexp"], "postprocess": d => d},
    {"name": "sexps", "symbols": ["sexp", "__", "sexps"], "postprocess": d => { d[2].unshift(d[0]); return d[2]; }},
    {"name": "sexp", "symbols": ["list"], "postprocess": d => d[0]},
    {"name": "sexp", "symbols": ["atom"], "postprocess": d => d[0]},
    {"name": "list", "symbols": [{"literal":"("}, "_", {"literal":")"}], "postprocess": d => null},
    {"name": "list", "symbols": [{"literal":"("}, "_", "sexps", "_", {"literal":")"}], "postprocess": d => d[2]},
    {"name": "atom$ebnf$1", "symbols": [/[a-z]/]},
    {"name": "atom$ebnf$1", "symbols": ["atom$ebnf$1", /[a-z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "atom", "symbols": ["atom$ebnf$1"], "postprocess": d => d[0].join("")},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": d => null},
    {"name": "__$ebnf$1", "symbols": [/[\s]/]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": d => null}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
