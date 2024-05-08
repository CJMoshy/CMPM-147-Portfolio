
function init() {
    return [
        {
            name: 'U.S. Flag',
            link: './img/american_flag.jpg',
            refactored: false
        },
        {
            name: 'Lake Tahoe',
            link: './img/Lake_Tahoe.jpg',
            refactored: false
        },
        {
            name: 'Pinecrest Lake (Winter)',
            link: './img/pinecrest_lake.jpg',
            refactored: false
        }
    ]
}

function determineColor(width, height) {

    let count = 1
    let widthTracker = 0

    let rgb = []
    let row = []
    let result = []
    pixels.forEach(p => {

        if (count === 4) {
            count = 1
            row.push(rgb)
            rgb = []
            widthTracker += 1
        } else {
            rgb.push(p)
            count += 1
        }

        if (widthTracker === width) {
            result.push(row)
            row = []
            widthTracker = 0
        }

    })

    let rowStart = 0, columnStart = 0, ss = SIZE
    let drawContext = []
    for (let i = 0; i < Math.floor(height / ss); i++) {
        for (let j = 0; j < Math.floor(width / ss); j++) {
            drawContext.push(parseArray(result, rowStart, columnStart, ss))
            columnStart += ss
        }
        rowStart += ss
        columnStart = 0
    }

    return drawContext
}

function parseArray(arr, rowStart, columnStart, ss) {

    let rvalue = 0, gvalue = 0, bvalue = 0

    for (let i = 0; i < ss; i++) {
        for (let j = 0; j < ss; j++) {
            rvalue += arr[i + rowStart][j + columnStart][0]
            gvalue += arr[i + rowStart][j + columnStart][1]
            bvalue += arr[i + rowStart][j + columnStart][2]
        }
    }

    let result = {
        x: columnStart,
        y: rowStart,
        r: Math.round(rvalue / (Math.pow(ss, 2))),
        g: Math.round(gvalue / (Math.pow(ss, 2))),
        b: Math.round(bvalue / (Math.pow(ss, 2)))
    }

    return result
}

function evaluate() {
    loadPixels();

    let error = 0;
    let n = pixels.length;

    for (let i = 0; i < n; i++) {
        error += sq(pixels[i] - currentInspirationPixels[i]);
    }
    return 1 / (1 + error / n);
}

function memorialize() {
    let url = canvas.canvas.toDataURL();

    let img = document.createElement("img");
    img.src = url;
    img.width = width;
    img.heigh = height;
    img.title = currentScore;
    img.width = width / 2;
    img.height = height / 2;

    if (count < MAXCOUNT) {
        document.getElementById("image-container3").appendChild(img.cloneNode());
        count += 1
    }
}

//copied from  https://p5js.org/examples/form-regular-polygon.html

function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}