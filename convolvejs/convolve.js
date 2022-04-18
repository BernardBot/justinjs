canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');
im = new Image();
im.src = 'ben.jpg';
im.onload = function() {
    canvas.width = im.width;
    canvas.height = im.height;
    ctx.drawImage(im, 0, 0);
    imdata = ctx.getImageData(0, 0, im.width, im.height);
};

function conv3(imdata, kernel) {
    let d = imdata.data;
    let dd = d.slice();
    
    const w = imdata.width;
    const h = imdata.height;
    
    const a = (w + 1) * 4;
    const b = w * 4;
    const c = (w - 1) * 4;

    for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
            let i = (y * w + x) * 4;
            for (let j = i; j < i + 3; j++) {
                dd[j] = (
                    d[j - a] * kernel[0] +
                    d[j - b] * kernel[1] +
                    d[j - c] * kernel[2] +
                    d[j - 4] * kernel[3] +
                    d[j]     * kernel[4] +
                    d[j + 4] * kernel[5] +
                    d[j + c] * kernel[6] +
                    d[j + b] * kernel[7] +
                    d[j + a] * kernel[8]
                );
            }
        }
    }

    return new ImageData(dd, w, h);
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

// https://setosa.io/ev/image-kernels/
EMBOSS_KERNEL = [
    -2, -1, 0,
    -1, 1, 1,
    0, 1, 2,
];

BOTTOMSOBEL_KERNEL = [
    -1, -2, -1,
    0, 0, 0,
    1, 2, 1,
];

LEFTSOBEL_KERNEL = [
    1, 0, -1,
    2, 0, -2,
    1, 0, -1,
];

RIGHTSOBEL_KERNEL = [
    -1, 0, 1,
    -2, 0, 2,
    -1, 0, 1,
];

TOPSOBEL_KERNEL = [
    1, 2, 1,
    0, 0, 0,
    -1, -2, -1,
];