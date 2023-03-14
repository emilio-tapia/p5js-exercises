let noiseImg;
let noiseScale = 500;
let nParticles = 2;
let speedStep = 0.6;
let noiseOpacity = 1;
let definition = 1;

const particlesArr = [];

function setup() {
  // createCanvas(window.innerWidth, window.innerHeight);

  let canv = createCanvas(windowWidth, windowHeight);

  canv.mousePressed(setup); // each click changes the art
  rectMode(CENTER);
  noiseDetail(1, 0);
  genNoiseImg();
  image(noiseImg, 0, 0);
  // initialize particle
  const density = 60; // Lines details
  const space = width / density; //Spacing between lines

  for (let i = 0; i < nParticles; i += space) {
    for (let x = 0; x < width; x += space) {
      for (let y = 0; y < height; y += space) {
        let particle = new Object();
        particle.pos = createVector(random(width), random(height));
        particlesArr.push(particle);
      }
    }
  }
  // background(0);
}

function draw() {
  tint(255, 20);
  image(noiseImg, 0, 0);
  strokeWeight(2);
  stroke(250);
  let noiseVal;

  for (let x = 0; x < width; x++) {
    noiseVal = noise((mouseX + x) * noiseScale, mouseY * noiseScale);
  }

  for (let i = 0; i < particlesArr.length; i++) {
    let p = particlesArr[i];

    let fallColor = i;
    if (fallColor > 255) {
      fallColor = i % 255;
    }

    // Limiting/Masking into a circle the lines
    if (dist(width / 2, height / 2, p.pos.x, p.pos.y) < 300) {
      let redInterpolation = map(p.pos.x, 0, width, 0, 255);
      let greenInterpolation = map(p.pos.y, 0, height, 0, 255);
      let blueInterpolation = map(p.pos.x + p.pos.y, 0, width + height, 0, 255);
      p.pos.add(createVector(cos(width / 2), sin(height)));
      p.pos.add(curl(cos(p.pos.x) * 100, 0));
      stroke(fallColor, 0, 0, 255);
      translate(-0.01, -0.01);
      circle(p.pos.x, p.pos.y, 1);
      // ellipse(p.pos.x, p.pos.y, 1);
    }

    // console.log(dist(width / 2, height / 2, p.pos.x, p.pos.y));
  }
}

//Generate Noise
function genNoiseImg() {
  noiseImg = createGraphics(width, height);
  noiseImg.loadPixels();
  let widthHD = width * pixelDensity();
  let heightHD = height * pixelDensity();

  for (let x = 0; x < widthHD; x++) {
    for (let y = 0; y < heightHD; y++) {
      // let xPoint = x / pixelDensity();
      // let yPoint = y / pixelDensity();
      // let bright = pow((xPoint / noiseScale, yPoint / noiseScale), 1);
      let bright;
      noiseImg.pixels[(x + y * widthHD) * 4] = bright;
      // noiseImg.pixels[(x + y * widthHD) * 4 + 1] = bright;
      // noiseImg.pixels[(x + y * widthHD) * 4 + 2] = bright;
      noiseImg.pixels[(x + y * widthHD) * 4 + 3] = 250;
    }
  }
  noiseImg.updatePixels();
}

// Get Gradient vector and rotate 90deg
function curl(x, y) {
  const EPSILON = 1; // sampling interval

  //find rate of x direction
  let n1 = noise(x + EPSILON, y);
  let n2 = noise(x - EPSILON, y);

  // Average Find approximate derivative
  let cx = (n1 - n2) / (speedStep * EPSILON);

  //find rate of y direction
  n1 = noise(x, y + EPSILON);
  n2 = noise(x, y - EPSILON);

  // Average Find approximate derivative
  let cy = (n1 - n2) / (speedStep * EPSILON);

  return new createVector(cx, cy); // gradient toward higher position
  // return new createVector(cx, -cy); // gradient toward higher position + rotate 90deg
}

// Save art as jpg.
function keyTyped() {
  if (key === 's') {
    save('myCanvas.jpg');
  }
}
