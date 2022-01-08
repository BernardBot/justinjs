class Complex {
    constructor(re, im) {
        this.re = re;
        this.im = im;
    }

    add(other) {
        return new Complex(this.re + other.re, this.im + other.im);
    }

    sub(other) {
        return new Complex(this.re - other.re, this.im - other.im);
    }

    mul(other) {
        return new Complex(this.re * other.re - this.im * other.im,
            this.re * other.im + this.im * other.re);
    }

    div(other) {
        let denom = other.re * other.re + other.im * other.im;
        return new Complex((this.re * other.re + this.im * other.im) / denom,
            (this.im * other.re - this.re * other.im) / denom);
    }

    exp() {
        let a = Math.exp(this.re);
        return new Complex(a * Math.cos(this.im), a * Math.sin(this.im));
    }

    log() {
        return new Complex(.5 * Math.log(this.re * this.re + this.im * this.im),
            Math.atan2(this.im, this.re));
    }

    pow(other) {
        return this.exp().mul(other.log());
    }

    logb(other) {
        return this.log().div(other.log());
    }

    cos() {
        return this.mul(this.conj()).div(new Complex(2, 0));
    }

    acos() {
        return this.sub(this.cos().pow(new Complex(0, 1))).log();
    }
}
