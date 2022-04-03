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

n = 0;
c = 0;

while (c < 10001) {
    n++;
    if (is_prime(n)) {
        c++;
    }
}

console.log(n);
