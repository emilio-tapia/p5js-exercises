function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  // noStroke();
  strokeWeight(70);
  noFill();
}

function draw() {
  background(230, 30, 23);
  hyperGradient3();
  // shadow();
}

function hyperGradient3() {
  conicGradient(
    0,
    width / 2,
    height / 2, //Start angle, pX, pY
    [
      color(190, 100, 100, 100),
      color(100, 100, 100, 100),
      color(10, 100, 100, 100),
      color(280, 100, 100, 100),
      color(190, 100, 100, 100),
    ]
  );
  ellipse(width / 2, height / 2, 400, 400);

  radialGradient(
    width / 2,
    height / 2,
    160, //Start pX, pY, start circle radius
    width / 2,
    height / 2,
    260, //End pX, pY, End circle radius
    color(0, 0, 100, 100), //Start color
    color(0, 0, 0, 0) //End color
  );
  ellipse(width / 2, height / 2, 400, 400);
}

function radialGradient(sX, sY, sR, eX, eY, eR, colorS, colorE) {
  let gradient = drawingContext.createRadialGradient(sX, sY, sR, eX, eY, eR);
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);
  // drawingContext.fillStyle = gradient;
  drawingContext.strokeStyle = gradient;
}

function conicGradient(sA, sX, sY, colors) {
  let gradient = drawingContext.createConicGradient(sA, sX, sY);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.25, colors[1]);
  gradient.addColorStop(0.5, colors[2]);
  gradient.addColorStop(0.75, colors[3]);
  gradient.addColorStop(1, colors[4]);

  drawingContext.strokeStyle = gradient;
}

function shadow() {
  drawingContext.shadowOffsetX = 10;
  drawingContext.shadowOffsetY = 10;
  drawingContext.shadowBlur = 16;
  drawingContext.shadowColor = color(230, 30, 18, 100);
}
