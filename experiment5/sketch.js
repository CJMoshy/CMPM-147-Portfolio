/**
 * written by CJ Moshy for cmpm 147 experiment 05
 */
const IMGREF = init()

let canvas = undefined, currentRef = undefined, currentScore = 0, context = [], currentInspirationPixels = []

const SIZE = 10
const MAXCOUNT = 20
let count = 0, mutationRate = 0

let selectedRadioButton
async function validateActive() {
    setInterval(() => {
        selectedRadioButton = document.querySelector('input[name="shape"]:checked')
    }, 500)
}

validateActive()

function preload() {

    let selectPrompt = document.createElement('option')
    selectPrompt.innerHTML = "Select an option"
    selectPrompt.disabled = true
    selectPrompt.selected = true
    document.getElementById('dropper').appendChild(selectPrompt)

    IMGREF.forEach(e => {
        e.image = loadImage(e.link)
        let a = document.createElement('option')
        a.innerHTML = e.name
        document.getElementById('dropper').appendChild(a)
    })

    document.getElementById('dropper').onchange = e => {
        currentRef = e.target.value
        setup(currentRef)
    }

    document.getElementById('restart').onclick = () => {
        setup(currentRef)
    }

    document.getElementById('clear').onclick = () => {
        $('#image-container3').empty()
        currentScore = Number.NEGATIVE_INFINITY
        count = 0
    }
}

function setup(value) {

    if (value != undefined) {
        IMGREF.forEach(e => {
            if (e.name === value) {

                if (e.image.width > 250 && e.refactored === false) {
                    e.refactored = true
                    e.image.width = e.image.width / 2
                    e.image.height = e.image.height / 2
                }

                canvas = createCanvas(e.image.width, e.image.height)
                canvas.parent(document.getElementById('image-container2')) //our canvas
                image(e.image, 0, 0)

                const imgHTML = `<img src="${e.link}" style="width:${e.image.width}px;">` //put a refrence photo
                $('#image-container').empty()
                $('#image-container').append(imgHTML);
                $('#image-container3').empty()

                currentScore = Number.NEGATIVE_INFINITY
                count = 0
                document.getElementById('slider').value = 100
            }
        })
        loadPixels()
        currentInspirationPixels = pixels
        context = determineColor(width, height)
    } else {
        canvas = createCanvas(200, 200)
        canvas.parent(document.getElementById('image-container'))
    }
}

function draw() {

    document.getElementById('rate').innerHTML = document.getElementById('slider').value //update slider value
    mutationRate = document.getElementById('slider').value

    if (mutationRate <= 12) {
        mutationRate = 12
    }

    if (context != []) {
        context.forEach(e => {
            noStroke()
            fill(e.r, e.g, e.b)
            if (selectedRadioButton.value === '1') {
                circle(e.x, e.y, random(mutationRate))
            } else if (selectedRadioButton.value === '2') {
                polygon(e.x, e.y, random(mutationRate), 6)
            } else if (selectedRadioButton.value === '3') {
                polygon(e.x, e.y, random(mutationRate), 8)
            }
        })
    }

    let nextScore = evaluate();
    document.getElementById('activeScore').innerHTML = nextScore

    if (nextScore > currentScore) {
        currentScore = nextScore;
        memorialize();
        bestScore.innerHTML = currentScore;
    }

    fpsCounter.innerHTML = Math.round(frameRate());
}