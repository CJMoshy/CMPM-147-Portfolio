// sketch.js - purpose and description here
// Author: Your Name
// Date:


$(document).ready(() => {
  var canvasContainer = $("#canvas-container");
  let s1 = (sketch) => {
    sketch.seed = 0
    sketch.currentGrid = []
    sketch.ref = 1
    sketch.tileset
    sketch.preload = () => {
      sketch.tileset = sketch.loadImage('./assets/tileset.png', () => { console.log('loaded image properly'), () => { console.log('failed to load image') } })
    }
    sketch.setup = () => {
      let canvas1 = sketch.createCanvas(canvasContainer.width(), canvasContainer.height())
      canvas1.parent("canvas-container")
      let reseedButton = sketch.createButton('Reseed')
      reseedButton.position(10, 10)
      reseedButton.mousePressed(() => {
        reseed(sketch)
      })

      reseed(sketch)

      $(window).resize(function() {
        resizeScreen(sketch);
      })
    }
    sketch.draw = () => {reparseGrid(sketch); drawGrid(sketch)}
  }
  new p5(s1)

  // Second p5 sketch
  var canvasContainer2 = $("#canvas-container2");
  let s2 = (sketch) => {
    sketch.seed = 0
    sketch.currentGrid = []
    sketch.ref = 2
    sketch.tileset
    sketch.preload = () => {
      sketch.tileset = sketch.loadImage('./assets/tileset.png', () => { console.log('loaded image properly'), () => { console.log('failed to load image') } })
    }
    sketch.setup = () => {
      let canvas2 = sketch.createCanvas(canvasContainer2.width(), canvasContainer2.height());
      canvas2.parent("canvas-container2")

      let reseedButton = sketch.createButton('Reseed')
      reseedButton.position(100, 10)
      reseedButton.mousePressed(() => {
        reseed(sketch)
      })

      reseed(sketch)

        
      $(window).resize(function() {
        resizeScreen(sketch);
      })

    }
    sketch.draw = () => { reparseGrid(sketch)}
  }
  new p5(s2);


  function resizeScreen(p5) {
    switch(p5.ref){
      case 1:
        centerHorz = canvasContainer.width() / 2 // Adjusted for drawing logic
        centerVert = canvasContainer.height() / 2 // Adjusted for drawing logic
        console.log("Resizing... canvas 1")
        p5.resizeCanvas(canvasContainer.width(), canvasContainer.height()) 
        drawGrid(p5)
        break
      case 2:
        centerHorz2 = canvasContainer2.width() / 2 // Adjusted for drawing logic
        centerVert2 = canvasContainer2.height() / 2 // Adjusted for drawing logic
        console.log("Resizing... canvas 2")
        p5.resizeCanvas(canvasContainer2.width(), canvasContainer2.height()) 
        drawGrid(p5)
      default:
        break
    }
  }
})




