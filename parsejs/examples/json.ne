# https://www.json.org/json-en.html
# https://github.com/kach/nearley/blob/master/examples/json.ne
main -> element

value -> object
       | array
       | string
       | number
       | "true"
       | "false"
       | "null"
	   
object -> "{" ws "}"
        | "{" members "}"
		
members -> member
         | member "," members

member -> ws string ws ":" element

array -> "[" ws "]"
       | "[" elements "]"
	   
elements -> element
          | element "," elements
		  
element -> ws value ws

string -> "\"" [\w]:+ "\""

number -> [\d]:+

ws -> [\s]:*
