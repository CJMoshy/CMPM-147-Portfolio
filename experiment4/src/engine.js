// Project base code provided by {amsmith,ikarth}@ucsc.edu

// Transforms between coordinate systems
/////////////////////////////

function worldToScreen(p5, [world_x, world_y], [camera_x, camera_y]) {
  let i, j

  switch (p5.ref) {
    case 1:
      i = (world_x - world_y) * p5.tile_width_step_main;
      j = (world_x + world_y) * p5.tile_height_step_main;
      return [i + camera_x, j + camera_y];
    case 2:
      i = (world_x - world_y) * p5.tile_width_step_main + p5.width / 2;
      j = (world_x + world_y) * p5.tile_height_step_main - p5.height / 2;
      return [i + camera_x, j + camera_y];

    case 3:
      i = (world_x - world_y) * p5.tile_width_step_main;
      j = (world_x + world_y) * p5.tile_height_step_main;
      return [i + camera_x, j + camera_y];


    default:
      break
  }
}

function worldToCamera([world_x, world_y]) {
  let i = (world_x - world_y) * tile_width_step_main;
  let j = (world_x + world_y) * tile_height_step_main;
  return [i, j];
}

function tileRenderingOrder(offset) {
  return [offset[1] - offset[0], offset[0] + offset[1]];
}

function screenToWorld(p5, [screen_x, screen_y], [camera_x, camera_y]) {
  screen_x -= camera_x;
  screen_y -= camera_y;
  screen_x /= p5.tile_width_step_main * 2;
  screen_y /= p5.tile_height_step_main * 2;
  screen_y += 0.5;
  return [Math.floor(screen_y + screen_x), Math.floor(screen_y - screen_x)];
}

function cameraToWorldOffset(p5, [camera_x, camera_y]) {
  let world_x
  let world_y
  switch (p5.ref) {

    case 1:
      world_x = camera_x / (p5.tile_width_step_main * 2);
      world_y = camera_y / (p5.tile_height_step_main * 2);
      return { x: Math.round(world_x), y: Math.round(world_y) };

    case 2:
      world_x = camera_x / (p5.tile_width_step_main * 2);
      world_y = camera_y / (p5.tile_height_step_main * 2);
      return { x: Math.round(world_x), y: Math.round(world_y) };

    case 3:
      world_x = camera_x / (p5.tile_width_step_main * 2);
      world_y = camera_y / (p5.tile_height_step_main * 2);
      return { x: Math.round(world_x), y: Math.round(world_y) };
    default:
      break
  }
}

function worldOffsetToCamera([world_x, world_y]) {
  let camera_x = world_x * (tile_width_step_main * 2);
  let camera_y = world_y * (tile_height_step_main * 2);
  return new p5.Vector(camera_x, camera_y);
}

function rebuildWorld(p5, key) {
  if (window.p3_worldKeyChanged) {
    window.p3_worldKeyChanged(p5, key);
  }
  p5.tile_width_step_main = window.p3_tileWidth ? window.p3_tileWidth() : 32;
  p5.tile_height_step_main = window.p3_tileHeight ? window.p3_tileHeight() : 14.5;
  p5.tile_columns = Math.ceil(p5.width / (p5.tile_width_step_main * 2));
  p5.tile_rows = Math.ceil(p5.height / (p5.tile_height_step_main * 2));
}

// Display a discription of the tile at world_x, world_y.
function describeMouseTile(p5, [world_x, world_y], [camera_x, camera_y]) {
  let [screen_x, screen_y] = worldToScreen(p5,
    [world_x, world_y],
    [camera_x, camera_y]
  );
  drawTileDescription(p5, [world_x, world_y], [0 - screen_x, screen_y]);
}

function drawTileDescription(p5, [world_x, world_y], [screen_x, screen_y]) {
  p5.push();
  p5.translate(screen_x, screen_y);
  if (window.p3_drawSelectedTile) {
    window.p3_drawSelectedTile(p5, world_x, world_y, screen_x, screen_y);
  }
  p5.pop();
}

// Draw a tile, mostly by calling the user's drawing code.
function drawTile(p5, [world_x, world_y], [camera_x, camera_y]) {
  let [screen_x, screen_y] = worldToScreen(p5,
    [world_x, world_y],
    [camera_x, camera_y]
  )
  p5.push()
  p5.translate(0 - screen_x, screen_y)
  if (window.p3_drawTile) {
    window.p3_drawTile(p5, world_x, world_y)
  }
  p5.pop()
}
