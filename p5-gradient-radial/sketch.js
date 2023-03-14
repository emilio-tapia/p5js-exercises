function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  // strokeWeight(70);
  // noFill();
}

function draw() {
  background(230, 30, 23);

  hyperGradient1();
  shadow();
}

function hyperGradient1() {
  radialGradient(
    450,
    150,
    0, //Start pX, pY, start circle radius
    450,
    150,
    250, //End pX, pY, End circle radius
    color(190, 100, 100, 100), //Start color
    color(0, 100, 0, 0) //End color
  );
  ellipse(width / 2, height / 2, 400, 400);

  radialGradient(
    width - 450,
    150,
    0, //Start pX, pY, start circle radius
    width - 450,
    150,
    250, //End pX, pY, End circle radius
    color(250, 100, 100, 100), //Start color
    color(0, 100, 0, 0) //End color
  );
  ellipse(width / 2, height / 2, 400, 400);

  radialGradient(
    width - 450,
    height - 150,
    0, //Start pX, pY, start circle radius
    width - 450,
    height - 150,
    250, //End pX, pY, End circle radius
    color(280, 100, 100, 100), //Start color
    color(0, 100, 0, 0) //End color
  );
  ellipse(width / 2, height / 2, 400, 400);

  radialGradient(
    450,
    height - 150,
    0, //Start pX, pY, start circle radius
    450,
    height - 150,
    250, //End pX, pY, End circle radius
    color(40, 100, 100, 100), //Start color
    color(0, 100, 0, 0) //End color
  );
  ellipse(width / 2, height / 2, 400, 400);
}

function radialGradient(sX, sY, sR, eX, eY, eR, colorS, colorE) {
  let gradient = drawingContext.createRadialGradient(sX, sY, sR, eX, eY, eR);
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);
  drawingContext.fillStyle = gradient;
  // drawingContext.strokeStyle = gradient;
}

function shadow() {
  drawingContext.shadowOffsetX = 10;
  drawingContext.shadowOffsetY = 10;
  drawingContext.shadowBlur = 16;
  drawingContext.shadowColor = color(230, 30, 18, 100);
}
