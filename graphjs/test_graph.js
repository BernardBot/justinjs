obj = {
    "kaas" : {
        "ham" : {},
    },
    "math" : {
        "graph theory" : {
            "kaas" : {},
            "jam" : {},
        }
    }
}

ex1 = {
    "glossary": {
        "title": "example glossary",
		"GlossDiv": {
            "title": "S",
			"GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
					"SortAs": "SGML",
					"GlossTerm": "Standard Generalized Markup Language",
					"Acronym": "SGML",
					"Abbrev": "ISO 8879:1986",
                }
            }
        }
    }
}

G = D3Graph.from_object(ex1);

G.plot()