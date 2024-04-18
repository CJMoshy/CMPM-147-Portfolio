var tileset
var seed = 0
var currentGrid = []
let numRows, numCols

function preload(){
    tileset = loadImage('./assets/tileset.png', () => {console.log('loaded image properly'), () => {console.log('failed to load image')}})
}

function reseed(){
    seed = (seed | 0) + 1024
    randomSeed(seed)
    noiseSeed(seed)
    select("#seedReport").html("seed: " + seed.toString())
    reparseGrid()
}

function regenerateGrid(){
    
}

function reparseGrid() {
   stringToGrid(document.getElementById('asciiBox').value)
}

function gridToString(grid){
    let result = ''
    grid.forEach( element => {
        element.forEach( ele => {
            result += ele.toString() + ' '
        })
        result += '\n'
    })
    return result
}

function stringToGrid(str){
    currentGrid = []
    let row = []
    let tmp = str.split('')
    tmp.push('\n')
    tmp.forEach(element => {
        row.push(element)
        if(element == '\n'){
            row.pop()
            currentGrid.push(row)
            row = []
        }
    })
    
    return currentGrid 
}
  
function placeTile(i, j, ti, tj) {
    image(tileset, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}

function generateGrid(numCols, numRows) {

}
  
function drawGrid(grid) {

}
  
  