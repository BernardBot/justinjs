main -> scheme ":" authority:? path query:? fragment:?
scheme -> "http"
        | "https"
authority -> "//" userinfo:? host port:?
userinfo -> username (":" password):? "@"
username -> symbols
password -> symbols
host -> ip4
      | domain
ip4 -> number "." number "." number "." number
domain -> word
        | word "." domain
port -> ":" number
path -> segment
      | segment path
segment -> "/" symbols
query -> "?" data:?
data -> datum
      | datum "&" data
datum -> symbols "=" symbols
fragment -> "#" symbols

word -> [\w]:+
number -> [\d]:+
symbols -> [\w\d\_\-]:*

