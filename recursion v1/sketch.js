const width = innerWidth;
const height = innerHeight;
let i = 0;

function setup() {
  createCanvas(width, height);
}

function draw() {
  background(120);
  noFill();
  translate(width / 2, height / 2);
  createCircle(0, 0, 500, 255);
  i++;
  console.log(i);
}

function createCircle(x, y, diameter, alpha) {
  let mapMouseX = map(mouseX, 0 - 200, width + 200, -2, 2);
  let mapMouseXdiameter = map(mouseX, 0 - 300, width + 300, 1.011, 1.011);
  let mapMouseY = map(mouseY, 0 - 200, height + 200, -2, 2);
  circle(x + mapMouseX, y + mapMouseY, diameter);
  stroke(0, 0, 0, alpha);

  if (diameter > 5) {
    console.log(mapMouseX);
    createCircle(
      x + mapMouseX,
      y + mapMouseY,
      diameter / mapMouseXdiameter,
      alpha / 1.04
    );
    // createCircle(x - diameter / 10, y, diameter / 1.6);
  }
  // if (diameter > 2) {
  //   // createCircle(x + diameter / 10, y, diameter / 1.6);
  //   createCircle(x - diameter / 10, y, diameter / 1.6);
  // }
}

// Save art as jpg.
function keyTyped() {
  if (key === 's') {
    save('myCanvas.jpg');
  }
}
