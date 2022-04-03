function is_palindrome(n) {
    return n.toString() === n.toString().split('').reverse().join('');
}

max = 0;
for (let i = 100; i < 1000; i++) {
    for (let j = 100; j < 1000; j++) {
        if (is_palindrome(i * j)) {
            max = Math.max(max, i * j);
        }
    }
}

console.log(max);
