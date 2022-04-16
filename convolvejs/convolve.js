class MyCanvas {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
    }

    remove() {
        document.body.removeChild(this.canvas);
    }

    im2imdata(im) {
        this.drawImage(im);
        return this.ctx.getImageData(0, 0, im.width, im.height);
    }

    setImageDims(im) {
        this.canvas.width = im.width;
        this.canvas.height = im.height;
    }

    drawImage(im) {
        this.setImageDims(im);
        this.ctx.drawImage(im, 0, 0);
    }

    putImageData(im) {
        this.setImageDims(im);
        this.ctx.putImageData(im, 0, 0);
    }
}

async function imread(src) {
    let im = new Image();
    im.src = src;
    return new Promise((resolve, reject) => {
        im.onload = () => resolve(im);
        im.onerror = reject;
    });
}

async function setup() {
    mycanvas = new MyCanvas();
    im = await imread("ben.jpg");
    imdata = mycanvas.im2imdata(im);
}
setup();

// imdata functions
function imdata_sum(imdata) {
    return imdata.data.reduce((a, b) => a + b);
}

// which values should be included (r, g, b, a)
function imdata_mean(imdata) {
    return imdata_sum(imdata) / imdata.data.length;
}

function imdata_invert(imdata) {
    let data = imdata.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
    return imdata;
}

function imdata_grayscale(imdata) {
    let data = imdata.data;
    for (let i = 0; i < data.length; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
    return imdata;
}

function imdata_conv3(imdata, kernel) {
    // TODO: generalize to n-dim convolution
    let data = imdata.data;
    let width = imdata.width;
    let height = imdata.height;
    let newdata = new Uint8ClampedArray(data.length);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = g = b = 0;

            for (let ky = 0; ky < 3; ky++) {
                for (let kx = 0; kx < 3; kx++) {
                    let x2 = x + kx - 1;
                    let y2 = y + ky - 1;

                    if (x2 < 0 || x2 >= width || y2 < 0 || y2 >= height) {
                        continue;
                    }

                    let i = (y2 * width + x2) * 4;
                    let ki = ky * 3 + kx;
                    r += data[i] * kernel[ki];
                    g += data[i + 1] * kernel[ki];
                    b += data[i + 2] * kernel[ki];
                }
            }

            let i = (y * width + x) * 4;
            newdata[i] = r;
            newdata[i + 1] = g;
            newdata[i + 2] = b;
            newdata[i + 3] = 255;
        }
    }

    for (let i = 0; i < data.length; i++) {
        data[i] = newdata[i];
    }

    return imdata;
}

ZERO_KERNEL = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
];

ID_KERNEL = [
    0, 0, 0,
    0, 1, 0,
    0, 0, 0,
];

RIDGE_KERNEL_V1 = [
    0, -1, 0,
    -1, 4, -1,
    0, -1, 0,
];

RIDGE_KERNEL_V2 = [
    -1, -1, -1,
    -1, 8, -1,
    -1, -1, -1,
];

SHARPEN_KERNEL = [
    0, -1, 0,
    -1, 5, -1,
    0, -1, 0,
];

BOXBLUR_KERNEL = [
    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
].map(x => x / 9);

GUASSIANBLUR_KERNEL = [
    1, 2, 1,
    2, 4, 2,
    1, 2, 1,
].map(x => x / 16);