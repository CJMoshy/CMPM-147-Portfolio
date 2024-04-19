// sketch.js - purpose and description here
// Author: Your Name
// Date:

//button
reseedButton.onclick = reseed


function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized


  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  reseed()
  

}

// draw() function is called repeatedly, it's the main animation loop
function draw() { 
  reparseGrid()
}

const array = [
  ['-', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd'],
  ['-', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd'],
  ['-', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd'],
  ['-', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd'],
  ['-', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd'],
  ['-', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd'],
  ['-', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd'],
  ['-', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd'],
  ['-', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd'],
  ['-', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd'],
  ['-', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd'],
  ['-', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd'],
  ['-', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd'],
  ['-', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd'],
  ['-', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd'],
  ['-', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd', 'w', 'd']
];

