# https://simple.wikipedia.org/wiki/Names_for_large_numbers
main -> "zero" | ("negative" _):? billions

billions -> millions
          | hundreds _ "billion" (_ millions):?

millions -> thousands
          | hundreds _ "million" (_ thousands):?

thousands -> hundreds
           | hundreds _ "thousand" (_ hundreds):?

hundreds -> tens
          | ones _ "hundred" (_ tens):?

tens -> ones
      | teens
	  | tys (_ ones):?

ones -> "one"
      | "two"
	  | "three"
	  | "four"
	  | "five"
	  | "six"
	  | "seven"
	  | "eight"
	  | "nine"

teens -> "ten"
	   | "eleven"
	   | "twelve"
	   | "thirteen"
	   | "fourteen"
	   | "fifteen"
	   | "sixteen"
	   | "seventeen"
	   | "eighteen"
	   | "nineteen"

tys -> "twenty"
     | "thirty"
	 | "forty"
	 | "fifty"
	 | "sixty"
	 | "seventy"
	 | "eighty"
	 | "ninety"

_ -> " "
