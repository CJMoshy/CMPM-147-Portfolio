let translationBounds = {
  x: 0,
  y: 10,
  shrinking: false
}

function p3_worldKeyChanged(p5, key) {
  p5.worldSeed = XXH.h32(key, 0)
  p5.noiseSeed(p5.worldSeed)
  p5.randomSeed(p5.worldSeed)
}

function p3_tileWidth() {
  return 32
}
function p3_tileHeight() {
  return 16
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()]

let grassCoords = []

function setupW3Grass(p5) {
  let grassNoiseScale = 0.1
  let detail = 1.5
  for (let i = -tw; i < tw; i += detail) {
    for (let j = -th; j < th; j += detail) {
      let n = p5.noise(i * grassNoiseScale, j * grassNoiseScale)
      if (i + n > -tw && i + n < tw && j + n > -th && j + n < th) {
        grassCoords.push([i + n, j + n])
      }
    }
  }
}

let clicks = {}

function p3_tileClicked(i, j) {
  let key = [i, j]
  clicks[key] = 1 + (clicks[key] | 0)
}

function p3_drawBefore() { }

function p3_drawTile(p5, i, j) {
  switch (p5.ref) {
    case 1:

      p5.noStroke()

      if (XXH.h32("tile:" + [i, j], p5.worldSeed) % 4 == 0) {
        p5.fill(255, 102, 153)
      } else {
        p5.fill(255, 200)
      }

      p5.push()
      p5.beginShape()
      p5.vertex(-tw, 0)
      p5.vertex(0, th)
      p5.vertex(tw, 0)
      p5.vertex(0, -th)
      p5.endShape(p5.CLOSE)

      let n = clicks[[i, j]] | 0
      if (n % 2 == 1) {
        p5.fill(0, 0, 0, 32)
        p5.ellipse(0, 0, 10, 5)
        p5.translate(translationBounds.x, translationBounds.y)
        p5.fill(0, 168, 107)
        p5.ellipse(0, 0, 10, 10)
      } else {
        renderSparkles(p5)
      }
      p5.pop()

      break

    case 2:

      p5.noStroke()
      if (XXH.h32("tile:" + [i, j], p5.worldSeed) % 4 == 0) {
        p5.fill(0, 128, 0)
      } else {
        p5.fill(255, 200)
      }
      p5.push()
      p5.randomSeed(p5.worldSeed) //this should be moved most likely, but rebuild world not seeding properly  
      p5.box(p3_tileWidth(), p3_tileHeight(), p5.random(25, 100))
      p5.pop()
      break

    case 3:

      if (XXH.h32("tile:" + [i, j], p5.worldSeed) % 13 == 0) {
        p5.noStroke()
        p5.push()
        p5.fill(0, 128, 0)
        p5.beginShape()
        p5.vertex(-tw, 0)
        p5.vertex(0, th)
        p5.vertex(tw, 0)
        p5.vertex(0, -th)
        p5.endShape(p5.CLOSE)

        p5.fill(0, 255, 0)
        p5.beginShape()
        grassCoords.forEach(x => {
          p5.vertex(x[0], x[1])
        })
        p5.endShape()
        p5.pop()

      } else if (XXH.h32("tile:" + [i, j], p5.worldSeed) % 9 == 0) {
        p5.noStroke()
        p5.fill(139, 69, 19)

        p5.push()
        p5.beginShape()
        p5.vertex(-tw, 0)
        p5.vertex(0, th)
        p5.vertex(tw, 0)
        p5.vertex(0, -th)
        p5.endShape(p5.CLOSE)
        p5.pop()
        drawPineTree(p5, 0, 0, 15, 100)

      } else {

        let n1 = clicks[[i, j]] | 0

        if (n1 % 2 == 1) {
          p5.strokeWeight(0)
          p5.fill(0, 100, 0)

          p5.push()
          p5.beginShape()
          p5.vertex(-tw, 0)
          p5.vertex(0, th)
          p5.vertex(tw, 0)
          p5.vertex(0, -th)
          p5.endShape(p5.CLOSE)
          p5.pop()

          p5.strokeWeight(0.2)
          p5.line(-tw, 0, -tw, -10)
          p5.line(tw, 0, tw, -10)
          p5.line(0, th, 0, -10)
          p5.translate(0, -10)
          p5.line(-tw, 0, 0, th)
          p5.line(0, th, tw, 0)

          p5.push()
          p5.strokeWeight(0)
          p5.beginShape()
          p5.vertex(-tw, 0)
          p5.vertex(0, th)
          p5.vertex(tw, 0)
          p5.vertex(0, -th)
          p5.endShape(p5.CLOSE)
          p5.pop()

        } else {
          p5.noStroke()
          p5.fill(0, 128, 0)
          p5.push()
          p5.beginShape()
          p5.vertex(-tw, 0)
          p5.vertex(0, th)
          p5.vertex(tw, 0)
          p5.vertex(0, -th)
          p5.endShape(p5.CLOSE)
          p5.pop()
        }
      }
      break
  }
}

function p3_drawSelectedTile(p5, i, j) {
  p5.noFill()
  p5.stroke(0, 0, 255)

  p5.beginShape()
  p5.vertex(-tw, 0)
  p5.vertex(0, th)
  p5.vertex(tw, 0)
  p5.vertex(0, -th)
  p5.endShape(p5.CLOSE)

  p5.noStroke()
  p5.fill(0)
  p5.text("tile " + [i, j], 0, 0)
}

function p3_drawAfter(p5) {
}

function renderSparkles(p5) {
  p5.push()
  p5.fill(p5.random(0, 255), p5.random(0, 255), p5.random(0, 255))
  p5.square(0, 0, 2.5)
  p5.pop()
}

function updateTranslationBounds() {
  translationBounds.shrinking === false ? translationBounds.y -= 1 : translationBounds.y += 1
  translationBounds.y > -5 ? translationBounds.shrinking = false : undefined
  translationBounds.y < -30 ? translationBounds.shrinking = true : undefined
}

function drawPineTree(p5, x, y, trunkWidth, treeHeight) {
  // Draw trunk
  p5.push()
  p5.fill(101, 67, 33)
  p5.rectMode(p5.CENTER)
  p5.rect(x, y, trunkWidth, treeHeight)
  p5.pop()

  // Draw branches
  drawBranch(p5, x, y, 0)
}

function drawBranch(p5, x, y, count) {
  if (count > 4) {
    return
  }
  p5.push()
  p5.fill(0, 90, 0)
  p5.triangle(x, y - 20, x + 20, y, x - 20, y) // Adjusted y positions
  p5.pop()
  drawBranch(p5, x, y - 10, count += 1)
}

