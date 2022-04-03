
for (n = 1; ; n++) {
    found = true;
    
    for (i = 1; i <= 20; i++) {
        if (n % i != 0) {
            found = false;
            break;
        }
    }
    if (found) {
        console.log(n);
        break;
    }
}