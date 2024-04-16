// sketch.js - Proc gen landscape
// Author: CJ Moshy
// Date: 4/15/24

//Globals
const WIDTH = 800
const HEIGHT = 600

let x = -(WIDTH/2)
let y = -(HEIGHT/2) + 25

// mountains
let x1 = new Mountain(35, 0, -250, 35, undefined, [79, 64, 50])
let x2 = new Mountain(35, 0, -220, 35, undefined, [119, 98, 77])
let x3 = new perlinMountain(0)

//cacti
let c1 = new Cactus(200, 100, 25, 90, 1.0)
let c2 = new Cactus(150, 150, 25, 90, 1.0)
let c3 = new Cactus(90, 200, 25, 90, 1.0)


function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(WIDTH, HEIGHT);
  redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container")
  let canvas = createCanvas(WIDTH, HEIGHT, WEBGL)
  canvas.parent("canvas-container")
  // resize canvas is the page is resized
  $(window).resize(function () {
    resizeScreen();
  })
  frameRate(60)
  background(199, 179, 191)
  x3.generatePerlinMountains()
}

function draw() {

  //background color
  background(199, 179, 191)
  noStroke()

  //incrment x for translation of sphere
  x += 0.5 
  x > WIDTH ? x =  -(WIDTH/2) : undefined
 
  //don't rotate and translate the other things 
  push()
  fill(255, 255, 0); // Sphere color
  translate(x, y) // Move the sphere to its position
  sphere(20) // Draw the sphere
  pop()

  //set fill color for ground
  fill(227, 191, 144)
  rect(-(WIDTH / 2), 0, 800, (HEIGHT / 2))  

  // render the mountains
  x1.render()
  x2.render()
  x3.render()

  //render the cacti
  c1.show()
  c2.show()
  c3.show()

}

//interactivity
function mousePressed() {
  x1.reset()
  x2.reset()
  x3.reset()
  x3.generatePerlinMountains(0)
  c1.generate()
  c2.generate()
  c3.generate()
}
