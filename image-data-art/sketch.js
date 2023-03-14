let img;
let canvas;

function preload() {
  img = loadImage('p.jpg');
}

function setup() {
  canvas = createCanvas(img.width * 2, img.height * 2);
  let canvasX = (innerWidth - img.width * 2) / 2;
  let canvasY = (innerHeight - img.height * 2) / 2;
  canvas.position(canvasX, canvasY);
  scale(1.75);
  // background(220);

  for (let column = 0; column < img.width; column += 1) {
    for (let row = 0; row < img.height; row += 1) {
      let pixels = img.get(column, row);
      let xPos = column;
      let yPos = row;
      // stroke(color(pixels));
      // strokeWeight(2);
      // point(column, row);

      // noStroke();
      // fill(color(pixels));
      // rect(column, row, 10, 5);

      // console.log(xPos);

      push();
      translate(xPos, yPos);
      // noFill();
      strokeWeight(random(1, 2));
      stroke(color(pixels));
      curve(
        xPos,
        0,
        sin(xPos) * random(1.5),
        cos(xPos) * random(2),
        0,
        xPos / 1.5,
        cos(yPos) * sin(xPos) * random(4),
        cos(yPos) * random(10)
      );
      pop();
    }
  }
}

function draw() {}
