let cellsize = 25;

function setup() {
  // createCanvas(innerWidth, innerHeight);

  let canv = createCanvas(windowWidth, windowHeight);

  // canv.mousePressed(setup); // each click changes the art
  angleMode(DEGREES);
  let context = drawingContext; // or p5.drawingContext
  context.shadowOffsetX = 5;
  context.shadowOffsetY = -5;
  context.shadowBlur = 10;
  context.shadowColor = '#000';
  noLoop();
}

function draw() {
  background(220);
  // drawCellA(40, 40);
  // drawCellB(80, 40);

  for (let i = 0; i < innerWidth; i += cellsize) {
    for (let j = 0; j < innerHeight; j += cellsize) {
      // drawCellA(i, j);
      // drawCellB(i, j);

      // se guarda en una variable la funcion random con array
      let listCell = random([drawCellA, drawCellB]);
      // se llama la funcion dentro del random y se pasan los paramentros i / j
      listCell(i, j);
    }
  }
}

function drawCellA(x, y) {
  push();
  noFill();
  translate(x, y);
  stroke(random(20, 200), random(20, 200), random(20, 200), 255);
  arc(0, 0, cellsize, cellsize, 0, 90);
  arc(cellsize, cellsize, cellsize, cellsize, 180, 270);
  pop();
}
function drawCellB(x, y) {
  push();
  noFill();
  translate(x, y);
  stroke(random(20, 200), random(20, 200), random(20, 200), 255);
  arc(cellsize, 0, cellsize, cellsize, 90, 180);
  arc(0, cellsize, cellsize, cellsize, 270, 360);
  pop();
}

// Save art as jpg.
function keyTyped() {
  if (key === 's') {
    save('myCanvas.jpg');
  }
}
