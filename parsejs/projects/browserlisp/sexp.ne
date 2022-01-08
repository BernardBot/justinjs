main -> _ sexps _
sexps -> sexp | sexp __ sexps
sexp -> list | atom
list -> "(" _ ")" | "(" _ sexps _ ")"
atom -> [a-z]:+
_ -> [\s]:*
__ -> [\s]:+
