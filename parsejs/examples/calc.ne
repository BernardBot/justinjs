main -> _ add _
add -> add _ opadd _ mul | mul
mul -> mul _ opmul _ exp | exp
exp -> val _ opexp _ exp | val
val -> "(" main ")" | num
num -> [\d]:+

opadd -> "+" | "-"
opmul -> "*" | "/"
opexp -> "^"
_ -> [ ]:*
