main  -> field          {% d => d %}
       | field "," main {% [d[0]].concat(d[2]) %}
field -> [a-z]:+        {% d => d.join("") %}