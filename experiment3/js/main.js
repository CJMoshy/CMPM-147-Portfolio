/**
 * written by CJ Moshy on 4/20/24
 * 
 * 
 * 
 * 
 * 
 */

//******************GLOBALS */
const numRows = 32, numCols = 32


const lookup = [
    [14, 0], //0 
    [2, 10], //1
    [1, 11], //2
    [2, 11], //3
    [1, 9], //4
    [2, 9], //5
    [3, 2], //6
    [14, 0], //7
    [0, 10], //8 
    [14, 0], //9
    [2, 4], //10
    [14, 0], //11
    [2, 11], //12
    [14, 0], //13
    [14, 0], //14
    [14, 0] //15
]

const lookupOffset = [
    [0, 0], //0 
    [0, -1], //1
    [-1, 0], //2
    [-1, 0], //3
    [0.65, 0], //4
    [0.5, 0], //5
    [0, 0], //6
    [0, 0], //7
    [0, 0.6], //8 
    [0, 0], //9
    [0, 0], //10
    [0, 0], //11
    [0, 0], //12
    [0, 0], //13
    [0, 0], //14
    [0, 0] //15
]

//********************FUNCTIONS */

/**
* @function getRandom pseudo-random number generator
* @param {number} min lowerbounds
* @param {number} max upperbounds
* @returns {number} random number inbetween lower and upperbounds
*/
function getRandom(min, max) {
    return Math.round(Math.random() * (max - min + 1) + min)
}

/**
 * @function reseed randomly picks another seed value for the maps
 * @param {p5.instance} p5 the current p5 instance to act upon
 * @returns {void}
 */
function reseed(p5) {
    p5.seed += 1
    p5.ref === 1 ? p5.select("#seedReport1").html("seed: " + p5.seed.toString()) : p5.select("#seedReport2").html("seed: " + p5.seed.toString())
    regenerateGrid(p5)
    drawGrid(p5)
}

/**
 * @function regenerateGrid generates a new grid with new asci placings
 * @param {p5.instance} p5 the current p5 instance to act upon
 * @returns {void}
 */
function regenerateGrid(p5) {
    generateGrid(p5, numRows, numCols)
    p5.ref === 1 ? document.getElementById('asciiBox').value = gridToString(p5.currentGrid) : document.getElementById('asciiBox2').value = gridToString(p5.currentGrid)
}

/**
 * @function reparseGrid listener for direct user changes to the grid
 * @param {p5.instance} p5 the current p5 instance to act upon
 * @returns {void} 
 */
function reparseGrid(p5) {
    p5.ref === 1 ? stringToGrid(p5, document.getElementById('asciiBox').value) === true ? drawGrid(p5) : undefined : stringToGrid(p5, document.getElementById('asciiBox2').value) === true ? drawGrid(p5) : undefined
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
 * @param {p5.instance} p5 the current p5 instance to act upon
 * @param {String} str the strring to parse into a 2D array, each new row is based on the occourance of '\n'
 * @returns {boolean}
 */
function stringToGrid(p5, str) {
    if (compare(str, p5.currentGrid.toString())) {
        return false
    }
    p5.currentGrid = []
    let row = []
    let tmp = str.split('')
    tmp.forEach(element => {
        row.push(element)
        if (element == '\n') {
            row.pop()
            p5.currentGrid.push(row)
            row = []
        }
    })
    return true
}

/**
 * @function placeTile based on a current tilemap refrence, will select one tile from that map and render it to the screen
 * @param {p5.instance} p5 the current p5 instance to act upon
 * @param {number} i the x coordinate on the canvas to render the image to
 * @param {number} j the y coordinate on the canvas to render the image to 
 * @param {number} ti the tilemap x coordinate to select from
 * @param {number} tj the tilemap y coordinate to select from
 * @returns {void}
 */
function placeTile(p5, i, j, ti, tj) {
    p5.image(p5.tileset, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8)
}

/**
 * @function generateGrid generate a new grid with unique ascii values
 * @param {p5.instance} p5 the current p5 instance to act upon
 * @param {number} numCols the number of columns that will be generated
 * @param {number} numRows the number of rows that will be generated
 * @returns {void}
 */
function generateGrid(p5, numCols, numRows) { //this guy is about to get disgusting LMAO

    p5.currentGrid = []
    Math.seedrandom(p5.seed) //set seed 

    switch (p5.ref) {
        case 1:

            for (let i = 0; i < numRows; i++) {
                let tmp = []
                for (let j = 0; j < numCols; j++) {
                    tmp.push('-')
                }
                p5.currentGrid.push(tmp)
            }
            drawRiver(p5, getRandom(0, 28), getRandom(0, 28))
            drawTrees(p5)
            break

        case 2:
            for (let i = 0; i < numRows; i++) {
                let tmp = []
                for (let j = 0; j < numCols; j++) {
                    //todo - more sophisticad algo
                    let decider = Math.round(Math.random())
                    decider === 0 ? tmp.push('+') : tmp.push('=')
                }
                p5.currentGrid.push(tmp)
            }
            break
        default:
            break
    }
}

/**
 * @function drawGrid draw the grid on the canvs
 * @param {p5.instance} p5 the current p5 instance to act upon
 * @returns {void}
 */
function drawGrid(p5) {
    p5.randomSeed(p5.seed)

    p5.background(128)

    for (let i = 0; i < p5.currentGrid.length; i++) {
        for (let j = 0; j < p5.currentGrid[i].length; j++) {
            if (p5.currentGrid[i][j] == '-') {
                placeTile(p5, i , j, (p5.floor(p5.random(4))), 0, 0)
                drawContext(p5, i , j, 'r')
            }
            // if (p5.currentGrid[i][j] == '.') {
            //     placeTile(p5, i, j, 0, 0);
            // }
            // if (p5.currentGrid[i][j] == '+') {
            //     placeTile(p5, i, j, (p5.floor(p5.random(10, 13))), 22);
            // }
            // if (p5.currentGrid[i][j] == '=') {
            //     placeTile(p5, i, j, (p5.floor(p5.random(10, 13))), 23);
            // }
            if (p5.currentGrid[i][j] == 'r') {
                placeTile(p5, i , j, (p5.floor(p5.random(3))), 14, 0);
            }
            // if(p5.currentGrid[i][j] == 'b'){
            //     placeTile(p5, i, j, (p5.floor(p5.random(3))), 4)
            // }
            if (p5.currentGrid[i][j] == 't') {
                placeTile(p5, i , j, 16, 1, 0)
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
    return str === str2 ? true : false
}

/**
 * @function drawRiver uses the drunkards walk algo to generate a 'river'
 * @param {p5.instance} p5 the current p5 instance to act upon
 * @param {number} x_init the initial x coordinate
 * @param {number} y_init the initial y coordinate
 * @returns {void}
 */
function drawRiver(p5, x_init, y_init) {

    const LIMIT = 75

    for (let i = 0; i < LIMIT; i++) {
        p5.currentGrid[x_init][y_init] = 'r'
        let deciderA = Math.round(Math.random())
        let deciderB = Math.round(Math.random())
        let decider = Math.round(Math.random())
        if (decider === 1) {
            deciderA === 1 ? x_init += 1 : x_init -= 1
            x_init >= 28 ? x_init = 28 : undefined
            x_init <= 0 ? x_init = 0 : undefined
        } else {
            deciderB === 1 ? y_init += 1 : y_init -= 1
            y_init >= 28 ? y_init = 28 : undefined
            y_init <= 0 ? y_init = 0 : undefined
        }
        // gridCode(p5, x_init, y_init, 'r', 'b')
    }
}

/**
 * @function drawTrees randomly places some trees on the canvas
 * @param {p5.instance} p5 the current p5 instance to act upon
 * @returns {void}
 */
function drawTrees(p5) {
    for (let i = 1; i < p5.currentGrid.length - 1; i++) {
        for (let j = 1; j < p5.currentGrid[i].length - 1; j++) {
            if (p5.currentGrid[i][j] !== 'r' && p5.currentGrid[i][j] !== 'b') {
                let decider = Math.random()
                decider > 0.99 ? p5.currentGrid[i][j] = 't' : undefined
            }
        }
    }
}

/**
 * @function gridCheck verify that the coordinates given are within bounds of the main drawing array
 * @param {p5.instance} p5 the current p5 instance to act upon
 * @param {number} i the i coordinate
 * @param {number} j the j coordinate
 * @param {string} target the target string or char '' to look for
 * @returns {void}
 */
function gridCheck(p5, i, j, target) {
    if (i <= numRows - 1 && i >= 0 && j <= numCols - 1 && j >= 0) { //make sure the place we want to check exists in the grid
        return p5.currentGrid[i][j] === target ? 1 : 0 //1 is true 0 is false
    }
}

/**
 * @function gridCode runs a bitmask verification on each tile
 * @param {p5.instance} p5 
 * @param {number} i the i coordinate
 * @param {number} j the j coordinate
 * @param {string} target the target string or char '' to look for
 * @returns {void}
 */
function gridCode(p5, i, j, target) {
    let result = 0
    gridCheck(p5, i - 1, j, target) === 1 ? result |= 1 : undefined
    gridCheck(p5, i + 1, j, target) === 1 ? result |= 8 : undefined
    gridCheck(p5, i, j - 1, target) === 1 ? result |= 2 : undefined
    gridCheck(p5, i, j + 1, target) === 1 ? result |= 4 : undefined

    return result
}

/**
 * @function drawContext renders the bitmask tiles to the scene
 * @param {p5.instance} p5 
 * @param {number} i the i coordinate
 * @param {number} j the j coordinate
 * @param {string} target the target string or char '' to look for
 * @returns {void}
 */
function drawContext(p5, i, j, target) {

    if (gridCode(p5, i, j, target) != 0) {
        // console.log(' here is the grid code... ', gridCode(p5, i, j, target))
        // console.log('found an occourence of something at ', i, ' ', j, '  ', gridCode(p5, i , j, target))
        const [tioffset, tjoffset] = lookup[gridCode(p5, i, j, target)]
        const [tjoffset1, tioffset1] = lookupOffset[gridCode(p5, i, j, target)]
        // console.log(tioffset, tjoffset)
        placeTile(p5, i + tioffset1, j + tjoffset1, tjoffset, tioffset)
        return true
    }
    return false
}

