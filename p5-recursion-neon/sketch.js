let mouseDistance,
  indexRecursive = 10;

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);

  noFill();
  stroke(207, 7, 99);
  strokeWeight(2);
}

function draw() {
  background(230, 50, 15);

  mouseDistance = dist(width / 2, height / 2, mouseX, mouseY);

  let offsetMouse = map(mouseDistance, 0, 725, 0, 600);

  let index = 0;

  let recursive = (size) => {
    if (index > indexRecursive) return;
    if (size > 0) {
      rect(width / 2, height / 2, size, size, 30);
      rect(width / 2, height / 2, size, size, 30);
      rect(width / 2, height / 2, size, size, 30);
      let sizeDistance = map(mouseDistance, 0, 725, 0, 50);
      size -= sizeDistance;
      index++;
      recursive(size);
    }
  };

  recursive(offsetMouse);

  // drawingContext.shadowOffsetX = offsetX;
  // drawingContext.shadowOffsetY = offsetY;
  drawingContext.shadowBlur = 32;
  drawingContext.shadowColor = color(207, 7, 99);

  // rect(width / 2, height / 2, 300, 300, 30);
}
