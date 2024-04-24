/**
 * written by CJ Moshy on 4/20/24
 * designed for CMPM 147 : Generative Methods
 * 
 * 
 */

//******************GLOBALS */
const numRows = 30, numCols = 30

const tileRefrence = [
    [0, 0], //0 
    [0, 0], //1
    [0, 0], //2
    [6, -12], //3
    [0, 0], //4
    [4, -12], //5
    [0, 0], //6
    [10, -12], //7
    [0, 0], //8 
    [14, 0], //9
    [6, -14], //10
    [6, -13], //11
    [4, -14], //12
    [4, -13], //13
    [5, -14], //14
    [14, 0] //15
]

//animation logic globals

let timeTracker1 = 0
let shouldBeWater = false
let rowLenCount = 0
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
    timeTracker1 = p5.millis() / 1000
    shouldBeWater = false
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
function generateGrid(p5, numCols, numRows) {

    p5.currentGrid = [] //clear the current grid
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
            drawRocks(p5)
            drawTrees(p5)
            // drawTower(p5)
            break
        case 2:
            for (let i = 0; i < numRows; i++) {
                let tmp = []
                for (let j = 0; j < numCols; j++) {
                    let decider = Math.round(Math.random())
                    decider === 0 ? tmp.push('+') : tmp.push('=')
                }
                p5.currentGrid.push(tmp)
            }
            generateHallway(p5)
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

    shouldBeWater = !shouldBeWater

    p5.randomSeed(p5.seed)
    for (let i = 0; i < p5.currentGrid.length; i++) {
        for (let j = 0; j < p5.currentGrid[i].length; j++) {
            if (rowLenCount === 0) {
                rowLenCount = p5.currentGrid[i].length
            } else rowLenCount -= 1
            if (p5.currentGrid[i][j] == '-') { //grass
                placeTile(p5, i, j, p5.random(0, 3), 0)
            }
            if (p5.currentGrid[i][j] == 'w') { //water
                if (shouldBeWater && p5.currentGrid[i][rowLenCount] == 'w') {
                    placeTile(p5, i, j, 1, 14)
                    drawContext(p5, i, j, 'w', 0, 14)
                } else {
                    placeTile(p5, i, j, 0, 14)
                    drawContext(p5, i, j, 'w', 0, 14)
                }
            }
            if (p5.currentGrid[i][j] == 'r') { //rock
                placeTile(p5, i, j, p5.random(0, 3), 0)
                placeTile(p5, i, j, 14, 15)
            }
            if (p5.currentGrid[i][j] == 't') { //tree
                placeTile(p5, i, j, p5.random(0, 3), 0)
                placeTile(p5, i, j, 14, 0)
            }

            //***********************DUNGEON */

            if (p5.currentGrid[i][j] == '+') {
                placeTile(p5, i, j, (p5.floor(p5.random(11, 13))), 22);
            }
            if (p5.currentGrid[i][j] == '=') {
                placeTile(p5, i, j, (p5.floor(p5.random(11, 13))), 23);
            }
            if (p5.currentGrid[i][j] == 'c') {
                placeTile(p5, i, j, 0, 23);
                drawContext(p5, i, j, 'c', 0, 23)
            }
            if (p5.currentGrid[i][j] == 'T') {
                placeTile(p5, i, j, (p5.floor(p5.random(0, 6))), 30);
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
        p5.currentGrid[x_init][y_init] = 'w'
        if (x_init + 1 < numRows && y_init + 1 < numCols) {
            p5.currentGrid[x_init + 1][y_init + 1] = 'w'
        }
        if (x_init - 1 > 0 && y_init - 1 > 0) {
            p5.currentGrid[x_init - 1][y_init - 1] = 'w'
        }
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
    }
    fillRiver(p5)
}

/**
 * @function drawRocks randomly places some rocks on the canvas
 * @param {p5.instance} p5 the current p5 instance to act upon
 * @returns {void}
 */
function drawRocks(p5) {
    for (let i = 1; i < p5.currentGrid.length - 1; i++) {
        for (let j = 1; j < p5.currentGrid[i].length - 1; j++) {
            if (p5.currentGrid[i][j] !== 'w') {
                let decider = Math.random()
                if (decider > 0.99) {
                    p5.currentGrid[i][j] = 'r'
                }
            }
        }
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
            if (p5.currentGrid[i][j] !== 'w' && p5.currentGrid[i][j] !== 'b' && p5.currentGrid[i][j] !== 't') {
                let decider = Math.random()
                if (decider > 0.99) {
                    p5.currentGrid[i][j] = 't'
                }
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
 * @param {p5.instance} p5 the current p5 instance to act upon 
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
 * @param {p5.instance} p5 the current p5 instance to act upon
 * @param {number} i the i coordinate
 * @param {number} j the j coordinate
 * @param {string} target the target string or char '' to look for
 * @returns {void}
 */

function drawContext(p5, i, j, target, ti, tj) {
    switch (target) {
        case 'w':
            if (gridCode(p5, i, j, target) != 0) {
                if (gridCode(p5, i, j, target) === 8) {
                    placeTile(p5, i, j, ti + 5, tj + (-14))
                    placeTile(p5, i, j, ti + 4, tj + (-14))
                    placeTile(p5, i, j, ti + 6, tj + (-14))
                } else if (gridCode(p5, i, j, target) === 1) {
                    placeTile(p5, i, j, ti + 4, tj + (-12))
                    placeTile(p5, i, j, ti + 5, tj + (-12))
                    placeTile(p5, i, j, ti + 6, tj + (-12))
                } else if (gridCode(p5, i, j, target) === 2) {
                    placeTile(p5, i, j, ti + 6, tj + (-12))
                    placeTile(p5, i, j, ti + 6, tj + (-13))
                    placeTile(p5, i, j, ti + 6, tj + (-14))
                } else if (gridCode(p5, i, j, target) === 4) {
                    placeTile(p5, i, j, ti + 4, tj + (-12))
                    placeTile(p5, i, j, ti + 4, tj + (-13))
                    placeTile(p5, i, j, ti + 4, tj + (-14))
                } else if (gridCode(p5, i, j, target) === 6) {
                    placeTile(p5, i, j, ti + 5, tj + (-12))
                    placeTile(p5, i, j, ti + 5, tj + (-14))
                } else {
                    const [tioffset, tjoffset] = tileRefrence[gridCode(p5, i, j, target)]
                    placeTile(p5, i, j, ti + tioffset, tj + tjoffset)
                }
            }
            break
        case '-':
            if (gridCode(p5, i, j, target) != 0) {
                if (gridCode(p5, i, j, target) === 15) {
                    placeTile(p5, i, j, ti, tj)
                }
            }
            break
        case 'c':
            if (gridCode(p5, i, j, target) != 0 && gridCode(p5, i, j, target) !== 15) {
                const [tioffset, tjoffset] = tileRefrence[gridCode(p5, i, j, target)]
                placeTile(p5, i, j, ti + tioffset, tj + tjoffset)
            }
            break
        default:
            break
    }
}

/**
 * @function generateHallway constructs the initial hallway leading to the main room of dungeon
 * @param {p5.instance} p5 the current p5 instance to act upon
 * @returns {void}
 */
function generateHallway(p5) {

    let y = getRandom(1, 27)

    let x_init = 0
    let stepSize = getRandom(3, 9)
    for (let i = 0; i < stepSize; i++) {
        p5.currentGrid[x_init][y] = 'c'
        p5.currentGrid[x_init][y + 1] = 'c'
        x_init += 1
    }

    generateRoom(p5, x_init, y)
}

/**
 * @function generateRoom generate the main body of the dungeon and the hallway leading south
 * @param {p5.instance} p5 the current p5 instance to act upon
 * @param {number} x_init the x coordinate to begin generating the dungeon on
 * @param {number} y_init the y coordinate to begin generating the dungeon on
 * @returns {void}
 */
function generateRoom(p5, x_init, y_init) {

    let limit = getRandom(4, 15)

    for (let i = 0; i < limit; i++) {
        for (let j = 0; j < limit; j++) {
            if (i + x_init < numRows && j + y_init < numCols - 2) {
                if (limit % 2 !== 0) {
                    if (i === Math.floor((limit / 2) + 1) && j === Math.floor((limit / 2) + 1)) {
                        p5.currentGrid[i + x_init][j + y_init] = 'T'
                        continue
                    }
                } else {
                    if (i === Math.floor((limit / 2)) && j === Math.floor((limit / 2))) {
                        p5.currentGrid[i + x_init][j + y_init] = 'T'
                        continue
                    }
                }
                p5.currentGrid[i + x_init][j + y_init] = 'c'
            }
        }
    }

    let tmp1 = limit + x_init - 1
    let tmp2 = limit + y_init - 2

    while (tmp1 < numCols) {
        if (tmp2 < numCols) {
            p5.currentGrid[tmp1][tmp2] = 'c'
            p5.currentGrid[tmp1][tmp2 - 1] = 'c'
        }
        tmp1 += 1
    }
}

/**
 * @function fillRiver /walk through the array and look for non water tiles that are surounded by 3 or more water tiles, then replace with water
 * @param {p5.instance} p5 the current p5 instance to act upon
 * @returns {void}
 */
function fillRiver(p5) {
    for (let i = 0; i < p5.currentGrid.length; i++) {
        for (let j = 0; j < p5.currentGrid[i].length; j++) {
            if (p5.currentGrid[i][j] === '-') {
                if (gridCode(p5, i, j, 'w') === 15 || gridCode(p5, i, j, 'w') === 7) {
                    p5.currentGrid[i][j] = 'w'
                }
            }
        }
    }
}
