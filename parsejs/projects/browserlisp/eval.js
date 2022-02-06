function eval_sexps(sexps) {
    return sexps.map(eval_sexp).pop();
}

function eval_sexp(sexp) {
    let fun = sexp[0];

    if (fun == "quote") {
        return sexp[1];
    }

    if (fun == "list") {
        return sexp.slice(1);
    }

    if (fun == "cond") {
        for (let i = 1; i < sexp.length; i++) {
            if (eval_sexp(sexp[i][0])) {
                return eval_sexp(sexp[i][1]);
            }
        }
        return null;
    }

    return eval_fun(fun, sexp.slice(1).map(eval_sexp));
}

function eval_fun(fun, args) {
    if (fun == "atom") {
        return !Array.isArray(args[0]);
    }

    if (fun == "null") {
        return Array.isArray(args) && args.length == 0;
    }

    if (fun == "eq") {
        return args[0] == args[1];
    }

    // list operations
    if (fun == "car") {
        return args[0][0];
    }
    if (fun == "cdr") {
        return args[0].slice(1);
    }
    if (fun == "cons") {
        return [args[0]].concat(args[1]);
    }

    return null;
}