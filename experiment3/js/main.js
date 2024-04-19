var tileset
var seed = 0
var currentGrid = []
// var asciiMapping = {
//     '-': [0,0],
//     '.': [1,1]
// }

const numRows = 8, numCols = 8

/**
 * @function preload OVERRIDE of p5s preload. Loads tilemap...
 */
function preload() {
    tileset = loadImage('./assets/tileset.png', () => { console.log('loaded image properly'), () => { console.log('failed to load image') } })
}

/**
 * @function reseed randomly picks another seed value for the maps
 * @returns {void}
 */
function reseed() {
    seed = (seed | 0) + 1024
    randomSeed(seed)
    noiseSeed(seed)
    select("#seedReport").html("seed: " + seed.toString())
    regenerateGrid()
    drawGrid()
}

/**
 * @function regenerateGrid generates a new grid with new asci placings
 * @returns {void}
 */
function regenerateGrid() {
    generateGrid(numRows, numCols)
    document.getElementById('asciiBox').value = gridToString(currentGrid)
}

/**
 * @function reparseGrid listener for direct user changes to the grid
 * @returns {void} 
 */
function reparseGrid() {
    stringToGrid(document.getElementById('asciiBox').value) === true ? drawGrid() : undefined
}

/**
 * @function gridToString takes in a 2D array of characters and iterates through appending each character to a string
 * @param {Array} grid the grid to transalte to string
 * @returns {String} the string that has been parsed from the grid
 */
function gridToString(grid) {
    let result = ''
    grid.forEach(element => {
        element.forEach(ele => {
            result += ele
        })
        result += '\n'
    })
    return result
}

/**
 * @function stringToGrid takes in a string and parses each character into a 2D array
 * @param {String} str the strring to parse into a 2D array, each new row is based on the occourance of '\n'
 * @returns {void}
 */
function stringToGrid(str) {
    if (compare(str, currentGrid.toString())) {
        return false
    }
    currentGrid = []
    let row = []
    let tmp = str.split('')
    tmp.forEach(element => {
        row.push(element)
        if (element == '\n') {
            row.pop()
            currentGrid.push(row)
            row = []
        }
    })

    return true
}

/**
 * @function placeTile based on a current tilemap refrence, will select one tile from that map and render it to the screen
 * @param {number} i the x coordinate on the canvas to render the image to
 * @param {number} j the y coordinate on the canvas to render the image to 
 * @param {number} ti the tilemap x coordinate to select from
 * @param {number} tj the tilemap y coordinate to select from
 * @returns {void}
 */
function placeTile(i, j, ti, tj) {
    image(tileset, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}


/**
 * @function generateGrid generate a new grid with unique ascii values
 * @param {number} numCols the number of columns that will be generated
 * @param {number} numRows the number of rows that will be generated
 * @returns {void}
 */
function generateGrid(numCols, numRows) {
    currentGrid = []
    for (let i = 0; i < numRows; i++) {
        let tmp = []
        for (let j = 0; j < numCols; j++) {
            //todo - more sophisticad algo
            let decider = Math.round(Math.random())
            decider === 0 ? tmp.push('-') : tmp.push('.')
        }
        currentGrid.push(tmp)
    }
}

/**
 * @function drawGrid draw the grid on the canvs
 * @returns {void}
 */
function drawGrid() {
    background(128)
    for (let i = 0; i < currentGrid.length; i++) {
        for (let j = 0; j < currentGrid[i].length; j++) {
            if (currentGrid[i][j] == '-') {
                placeTile(i, j, (floor(random(4))), 0);
            }
            if (currentGrid[i][j] == '.') {
                placeTile(i, j, (floor(random(4))), 0);
            }
        }
    }
}

/**
 * @function compare takes in two strings and parses any commas or endline chars from them, and then comares the two strings for equality
 * @param {String} str the first comparison string
 * @param {String} str2 the second comparison string
 * @returns {boolean}
 */
function compare(str, str2) {
    str = str.replace(/\n/g, '').replace(/,/g, '')
    str2 = str2.replace(/\n/g, '').replace(/,/g, '')
    if (str === str2) {
        return true
    } else return false
}