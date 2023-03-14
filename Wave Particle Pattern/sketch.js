let noiseImg;
let noiseScale = 500;
let nParticles = 200;
let speedStep = 0.1;
let noiseOpacity = 1;
let definition = 0.1;

const particlesArr = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noiseDetail(1, 0);
  genNoiseImg();
  // frameRate(10);
  image(noiseImg, 0, 0);

  // initialize particle
  const density = 5; // Lines details
  const space = width / density; //Spacing between lines

  for (let i = 0; i < nParticles; i++) {
    for (let x = 0; x < width; x += space) {
      for (let y = 0; y < height; y += space) {
        let particle = new Object();
        particle.pos = createVector(random(width), height / 2);
        particlesArr.push(particle);
      }
    }
  }
}

function draw() {
  tint(255, 80);
  image(noiseImg, 0, 0);
  strokeWeight(2);
  stroke(250);
  for (let i = 0; i < particlesArr.length; i++) {
    let p = particlesArr[i];

    p.pos.add(curl(p.pos.x / noiseScale, p.pos.y / noiseScale));
    // Limiting/Masking into a circle the lines
    if (dist(width / 2, height / 2, p.pos.x, p.pos.y) < 900) {
      point(p.pos.x, p.pos.y);
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
      let xPoint = x / pixelDensity();
      let yPoint = y / pixelDensity();
      let bright =
        pow((xPoint / noiseScale, yPoint / noiseScale) - definition, 0.01) *
        noiseOpacity;
      noiseImg.pixels[(x + y * widthHD) * 4] = bright;
      noiseImg.pixels[(x + y * widthHD) * 4 + 1] = bright;
      noiseImg.pixels[(x + y * widthHD) * 4 + 2] = bright;
      noiseImg.pixels[(x + y * widthHD) * 4 + 3] = 255;
    }
  }
  noiseImg.updatePixels();
}

// Get Gradient vector and rotate 90deg
function curl(x, y) {
  const EPSILON = 0.001; // sampling interval

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
