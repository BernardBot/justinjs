s1 = 0;
s2 = 0;

for (i = 1; i <= 100; i++) {
    s1 += i;
    s2 += i * i;
}

console.log(Math.abs(s2 - s1 * s1));
