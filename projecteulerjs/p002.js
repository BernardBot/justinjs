sum = 0;

a = 0;
b = 1;

while (a < 4000000) {
    c = a + b;
    a = b;
    b = c;
    if (a % 2 == 0) {
        sum += a;
    }
}

console.log(sum);
