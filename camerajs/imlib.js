/*
Central datatype is ImageData:
https://developer.mozilla.org/en-US/docs/Web/API/ImageData

which itself is a wrapper around a Uint8ClampedArray (it adds width, heigth attributes):
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray
represents a one-dimensional array containing the
data in the RGBA order, with integer values between 0 and 255 (inclusive).

To create an ImagaData object, you can use a canvas:
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
*/

function grayscale(imdata) {
    let data = imdata.data;
    for (let i = 0; i < data.length; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
}

function copy(imdata) {
    return new ImageData(
        new Uint8ClampedArray(imdata.data), imdata.width, imdata.height);
}

// how to get neighbours?
// should just pad the image with zeros/something else?
function thumbnail(imdata, width = 64, height = 64) {
    let nail = new ImageData(width, height);

    let data = imdata.data;
    let naildata = nail.data;

    let width_ratio = Math.floor(imdata.width / nail.width);
    let height_ratio = Math.floor(imdata.height / nail.height);
    let div = width_ratio * height_ratio;

    for (let i = 0; i < nail.width; i++) {
        for (let j = 0; j < nail.height; j++) {
            let avg = [0, 0, 0, 0];
            for (let x = 0; x < width_ratio; x++) {
                for (let y = 0; y < height_ratio; y++) {
                    let idx = (i * width_ratio + x + (j * height_ratio + y) * imdata.width) * 4;
                    avg[0] += data[idx];
                    avg[1] += data[idx + 1];
                    avg[2] += data[idx + 2];
                    avg[3] += data[idx + 3];
                }
            }

            let idx = (i + j * nail.width) * 4;
            naildata[idx] = avg[0] / div;
            naildata[idx + 1] = avg[1] / div;
            naildata[idx + 2] = avg[2] / div;
            naildata[idx + 3] = avg[3] / div;
        }
    }
    return nail;
}
