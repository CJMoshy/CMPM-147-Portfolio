// Author: CJ Moshy
// Date: 4/23/2024

$(document).ready(() => {

  console.log('document ready (exp04)')

  let selectedRadioButton
  async function validateActive() {
    setInterval(() => {
      selectedRadioButton = document.querySelector('input[name="Activate"]:checked')
      if (selectedRadioButton) {
        console.log(selectedRadioButton.value)
      }
    }, 500)
  }

  validateActive()

  //********* SKETCH 1 ******************************************************************** */
  const canvasContainer = $('#canvas-container')
  const s1 = (sketch) => {

    sketch.setup = () => {
      const canvas1 = sketch.createCanvas(canvasContainer.width(), canvasContainer.height())
      canvas1.parent('canvas-container')

      // instance specifics 
      setInterval(() => {
        updateTranslationBounds()
      }, 15)

      //instance refrence
      sketch.ref = 1

      // world seed
      sketch.worldSeed = undefined

      //tile size intervals
      sketch.tile_width_step_main = undefined // A width step is half a tile's width
      sketch.tile_height_step_main = undefined // A height step is half a tile's height

      //rows/cols
      sketch.tile_rows = undefined
      sketch.tile_columns = undefined

      //camera offset
      sketch.camera_offset = new p5.Vector(canvasContainer.width() / 2, canvasContainer.height() / 2)
      sketch.camera_velocity = new p5.Vector(0, 0)

      //input box
      sketch.inputBox = document.getElementById('inputBox')
      sketch.inputBox.value = 1
      rebuildWorld(sketch, sketch.inputBox.value)
      sketch.inputBox.addEventListener('input', () => {
        rebuildWorld(sketch, sketch.inputBox.value)
      })

      //resizer
      $(window).resize(function () {
        resizeScreen(sketch)
      })
    }

    sketch.draw = () => {

      sketch.background(100)

      //check for user input
      if (selectedRadioButton && selectedRadioButton.value == 1) {
        if (sketch.keyIsDown(sketch.LEFT_ARROW)) {
          sketch.camera_velocity.x -= 1
        }
        if (sketch.keyIsDown(sketch.RIGHT_ARROW)) {
          sketch.camera_velocity.x += 1
        }
        if (sketch.keyIsDown(sketch.DOWN_ARROW)) {
          sketch.camera_velocity.y -= 1
        }
        if (sketch.keyIsDown(sketch.UP_ARROW)) {
          sketch.camera_velocity.y += 1
        }


        // init camera properties
        sketch.camera_delta = new p5.Vector(0, 0)
        sketch.camera_velocity.add(sketch.camera_delta)
        sketch.camera_offset.add(sketch.camera_velocity)
        sketch.camera_velocity.mult(0.95) // cheap easing
        if (sketch.camera_velocity.mag() < 0.01) {
          sketch.camera_velocity.setMag(0)
        }

        //world pos
        let world_pos = screenToWorld(sketch,
          [0 - sketch.mouseX, sketch.mouseY],
          [sketch.camera_offset.x, sketch.camera_offset.y]
        )

        // world render offset
        let world_offset = cameraToWorldOffset(sketch, [sketch.camera_offset.x, sketch.camera_offset.y])

        // tile rendering properties
        let overdraw = 0.1
        let y0 = Math.floor((0 - overdraw) * sketch.tile_rows)
        let y1 = Math.floor((1 + overdraw) * sketch.tile_rows)
        let x0 = Math.floor((0 - overdraw) * sketch.tile_columns)
        let x1 = Math.floor((1 + overdraw) * sketch.tile_columns)

        //tile render
        for (let y = y0; y < y1; y++) {
          for (let x = x0; x < x1; x++) {
            drawTile(sketch, tileRenderingOrder([x + world_offset.x, y - world_offset.y]), [
              sketch.camera_offset.x,
              sketch.camera_offset.y
            ])
          }
          for (let x = x0; x < x1; x++) {
            drawTile(sketch,
              tileRenderingOrder([
                x + 0.5 + world_offset.x,
                y + 0.5 - world_offset.y
              ]),
              [sketch.camera_offset.x, sketch.camera_offset.y]
            )
          }
        }

        //mouse hover on tiles
        describeMouseTile(sketch, world_pos, [sketch.camera_offset.x, sketch.camera_offset.y])
      }
    }

    sketch.mousePressed = () => {
      if (selectedRadioButton && selectedRadioButton.value == 1) {
        let world_pos = screenToWorld(sketch,
          [0 - sketch.mouseX, sketch.mouseY],
          [sketch.camera_offset.x, sketch.camera_offset.y]
        )
        if (window.p3_tileClicked) {
          window.p3_tileClicked(world_pos[0], world_pos[1])
        }
      }
    }
  }
  new p5(s1)

  //********* SKETCH 2 ******************************************************************** */
  const canvasContainer2 = $('#canvas-container2')
  const s2 = (sketch) => {

    sketch.setup = () => {

      const canvas2 = sketch.createCanvas(canvasContainer2.width(), canvasContainer2.height(), sketch.WEBGL)
      canvas2.parent('canvas-container2')

      // instance specifics 
      sketch.angleMode(sketch.DEGREES)
      sketch.frameRate(144)
      sketch.ref = 2

      // world seed
      sketch.worldSeed = undefined

      //tile size intervals
      sketch.tile_width_step_main = undefined // A width step is half a tile's width
      sketch.tile_height_step_main = undefined // A height step is half a tile's height

      // rows/cols 
      sketch.tile_rows = undefined
      sketch.tile_columns = undefined

      //camera offset
      sketch.camera_offset = new p5.Vector(0, 0)
      sketch.camera_velocity = new p5.Vector(0, 0)

      //input box
      sketch.inputBox = document.getElementById('inputBox1')
      sketch.inputBox.value = 1
      rebuildWorld(sketch, sketch.inputBox.value)
      sketch.inputBox.addEventListener('input', () => {
        rebuildWorld(sketch, sketch.inputBox.value)
      })

      //resizer
      $(window).resize(function () {
        resizeScreen(sketch)
      })
    }

    sketch.draw = () => {

      sketch.background(100)

      //check for input
      if (selectedRadioButton && selectedRadioButton.value == 2) {
        if (sketch.keyIsDown(sketch.LEFT_ARROW)) {
          sketch.camera_velocity.x -= 1
        }
        if (sketch.keyIsDown(sketch.RIGHT_ARROW)) {
          sketch.camera_velocity.x += 1
        }
        if (sketch.keyIsDown(sketch.DOWN_ARROW)) {
          sketch.camera_velocity.y -= 1
        }
        if (sketch.keyIsDown(sketch.UP_ARROW)) {
          sketch.camera_velocity.y += 1
        }


        //camera properties
        sketch.camera_delta = new p5.Vector(0, 0)
        sketch.camera_velocity.add(sketch.camera_delta)
        sketch.camera_offset.add(sketch.camera_velocity)
        sketch.camera_velocity.mult(0.95) // cheap easing
        if (sketch.camera_velocity.mag() < 0.01) {
          sketch.camera_velocity.setMag(0)
        }

        let world_offset = cameraToWorldOffset(sketch, [sketch.camera_offset.x, sketch.camera_offset.y])

        let overdraw = 0.1
        let y0 = Math.floor((0 - overdraw) * sketch.tile_rows)
        let y1 = Math.floor((1 + overdraw) * sketch.tile_rows)
        let x0 = Math.floor((0 - overdraw) * sketch.tile_columns)
        let x1 = Math.floor((1 + overdraw) * sketch.tile_columns)
        for (let y = y0; y < y1; y++) {
          for (let x = x0; x < x1; x++) {
            drawTile(sketch, tileRenderingOrder([x + world_offset.x, y - world_offset.y]), [
              sketch.camera_offset.x,
              sketch.camera_offset.y
            ]) // odd row
          }
          for (let x = x0; x < x1; x++) {
            drawTile(sketch, tileRenderingOrder([x + 0.5 + world_offset.x, y + 0.5 - world_offset.y]), [sketch.camera_offset.x, sketch.camera_offset.y])  // even rows are offset horizontally
          }
        }
      }
    }

    sketch.mousePressed = () => {
      if (selectedRadioButton && selectedRadioButton.value == 2) {
        function getRandom(min, max) {
          return Math.round(Math.random() * (max - min + 1) + min)
        }
        sketch.camera(getRandom(-225, 225), getRandom(-225, 225), 500)
      }
    }
  }
  new p5(s2)

  //********* SKETCH 3 ******************************************************************** */
  const canvasContainer3 = $('#canvas-container3')
  const s3 = (sketch) => {

    sketch.setup = () => {
      const canvas3 = sketch.createCanvas(canvasContainer3.width(), canvasContainer3.height())
      canvas3.parent('canvas-container3')

      //instance specifics
      sketch.angleMode(sketch.DEGREES)
      sketch.ref = 3
      setupW3Grass(sketch)
      sketch.counter = 0

      // world seed
      sketch.worldSeed = undefined

      sketch.tile_width_step_main = undefined // A width step is half a tile's width
      sketch.tile_height_step_main = undefined // A height step is half a tile's height

      // Global variables. These will mostly be overwritten in setup().
      sketch.tile_rows = undefined
      sketch.tile_columns = undefined

      sketch.camera_offset = new p5.Vector(canvasContainer3.width() / 2, canvasContainer3.height() / 2)
      sketch.camera_velocity = new p5.Vector(0, 0)

      sketch.inputBox = document.getElementById('inputBox2')
      sketch.inputBox.value = 1
      rebuildWorld(sketch, sketch.inputBox.value)
      sketch.inputBox.addEventListener('input', () => {
        rebuildWorld(sketch, sketch.inputBox.value)
      })

      //resizer
      $(window).resize(function () {
        resizeScreen(sketch)
      })
    }

    sketch.draw = () => {

      sketch.background(100)
      if (selectedRadioButton && selectedRadioButton.value == 3) {
        if (sketch.keyIsDown(sketch.LEFT_ARROW)) {
          sketch.camera_velocity.x -= 1
        }
        if (sketch.keyIsDown(sketch.RIGHT_ARROW)) {
          sketch.camera_velocity.x += 1
        }
        if (sketch.keyIsDown(sketch.DOWN_ARROW)) {
          sketch.camera_velocity.y -= 1
        }
        if (sketch.keyIsDown(sketch.UP_ARROW)) {
          sketch.camera_velocity.y += 1
        }


        sketch.camera_delta = new p5.Vector(0, 0)
        sketch.camera_velocity.add(sketch.camera_delta)
        sketch.camera_offset.add(sketch.camera_velocity)
        sketch.camera_velocity.mult(0.95) // cheap easing
        if (sketch.camera_velocity.mag() < 0.01) {
          sketch.camera_velocity.setMag(0)
        }

        let world_pos = screenToWorld(sketch,
          [0 - sketch.mouseX, sketch.mouseY],
          [sketch.camera_offset.x, sketch.camera_offset.y]
        )

        let world_offset = cameraToWorldOffset(sketch, [sketch.camera_offset.x, sketch.camera_offset.y])

        if (window.p3_drawBefore) {
          window.p3_drawBefore()
        }

        let overdraw = 0.1
        let y0 = Math.floor((0 - overdraw) * sketch.tile_rows)
        let y1 = Math.floor((1 + overdraw) * sketch.tile_rows)
        let x0 = Math.floor((0 - overdraw) * sketch.tile_columns)
        let x1 = Math.floor((1 + overdraw) * sketch.tile_columns)
        for (let y = y0; y < y1; y++) {
          for (let x = x0; x < x1; x++) {
            drawTile(sketch, tileRenderingOrder([x + world_offset.x, y - world_offset.y]), [
              sketch.camera_offset.x,
              sketch.camera_offset.y
            ]) // odd row
          }
          for (let x = x0; x < x1; x++) {
            drawTile(sketch,
              tileRenderingOrder([
                x + 0.5 + world_offset.x,
                y + 0.5 - world_offset.y
              ]),
              [sketch.camera_offset.x, sketch.camera_offset.y]
            )  // even rows are offset horizontally
          }
        }

        describeMouseTile(sketch, world_pos, [sketch.camera_offset.x, sketch.camera_offset.y])

        if (window.p3_drawAfter) {
          window.p3_drawAfter(sketch)
        }
      }
    }

    sketch.mousePressed = () => {
      if (selectedRadioButton && selectedRadioButton.value == 3) {
        let world_pos = screenToWorld(sketch,
          [0 - sketch.mouseX, sketch.mouseY],
          [sketch.camera_offset.x, sketch.camera_offset.y]
        )
        if (window.p3_tileClicked) {
          window.p3_tileClicked(world_pos[0], world_pos[1])
        }
      }
    }
  }
  new p5(s3)

  // resize func
  function resizeScreen(p5) {
    switch (p5.ref) {
      case 1:
        centerHorz = canvasContainer.width() / 2 // Adjusted for drawing logic
        centerVert = canvasContainer.height() / 2 // Adjusted for drawing logic
        console.log('Resizing... canvas 1')
        p5.resizeCanvas(canvasContainer.width(), canvasContainer.height())
        break
      case 2:
        centerHorz2 = canvasContainer2.width() / 2 // Adjusted for drawing logic
        centerVert2 = canvasContainer2.height() / 2 // Adjusted for drawing logic
        console.log('Resizing... canvas 2')
        p5.resizeCanvas(canvasContainer2.width(), canvasContainer2.height())
        break
      default:
        break
    }
  }
})

