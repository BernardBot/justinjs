main  -> _ sexps _         {% d => d[1] %}

sexps -> sexp              {% d => d %}
       | sexp __ sexps     {% d => { d[2].unshift(d[0]); return d[2]; } %}
	   
sexp  -> list              {% d => d[0] %}
       | atom              {% d => d[0] %}
	   
list  -> "(" _ ")"         {% d => [] %}
       | "(" _ sexps _ ")" {% d => d[2] %}
	   
atom  -> [a-z]:+           {% d => d[0].join("") %}

_     -> [\s]:*            {% d => null %}
__    -> [\s]:+            {% d => null %}
