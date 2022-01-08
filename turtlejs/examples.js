function spiral(a=90, n=100) {
    for (let i = 0; i < n; i++) {
        forward(i);
        right(a);
    }
}

function dragno(n, l=5) {
    if (n < 1) {
        forward(l);
    } else {
        right(120);
        dragno(n - 1);
        left(120);
        dragno(n - 1);
        right(120);
        dragno(n - 1);
        left(120);
    }
}

function flake(n, l=1) {
    function side(n) {
        if (n < 1) {
            forward(l);
        } else {
            side(n - 1);
            right(60);
            side(n - 1);
            left(120);
            side(n - 1);
            right(60);
            side(n - 1);
        }
    }
    for (let i = 0; i < 3; i++) {
        side(n);
        left(120);
    }
}

function concentric(n=100,d=5) {
    for (let i = 0, r = 0; i < n; i++, r += d) {
        up();
        goto(0, -r);
        down();
        circle(r);
    }
}
