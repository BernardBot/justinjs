function is_prime(n) {
    if (n < 2) {
        return false;
    }

    let m = Math.floor(Math.sqrt(n));
    for (let i = 2; i <= m; i++) {
        if (n % i == 0) {
            return false;
        }
    }

    return true;
}

function factors(n) {
    let f = [];
    let m = Math.floor(Math.sqrt(n));
    for (let i = 1; i <= m; i++) {
        if (n % i == 0) {
            f.push(i);
            f.push(n / i);
        }
    }
    return f;
}

n = 600851475143;

console.log(factors(n).filter(is_prime).sort((a, b) => a - b).pop());
