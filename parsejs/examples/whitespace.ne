main -> _ sentence:? _
sentence -> word | word __ sentence
word -> [\w]:+
_ -> [\s]:*
__ -> [\s]:+
