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

sum = 0;

for (n = 1; n < 2e6; n++) {
    if (is_prime(n)) {
        sum += n;
    }
}

console.log(sum);
