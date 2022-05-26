const pointsArr = [];
const radius = 1;
const mult = 0.001;
let max;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
  angleMode(RADIANS);
  noiseDetail(0);
  const density = 400;
  const space = height / density;

  for (let x = 0; x < width; x += space) {
    for (let y = 0; y < height / 2; y += space) {
      let p = createVector(x, y);
      pointsArr.push(p);
    }
  }
}

function draw() {
  noStroke();

  if (frameCount * 150 <= pointsArr.length) {
    // Get the max number condition
    max = frameCount * 150;
  } else {
    max = pointsArr.length;
  }

  for (let i = 0; i < max; i++) {
    const r = map(pointsArr[i].x, 0, width, 250, 55);
    const g = map(pointsArr[i].y, 0, height, 250, 50);
    const b = map(pointsArr[i].x, 0, width, 255, 50);
    const alpha = map(
      dist(0, 0, pointsArr[i].x, pointsArr[i].y),
      0,
      width,
      255,
      255
    );

    fill(r, g, b, alpha);

    let angle = map(
      noise(pointsArr[i].x * mult, pointsArr[i].y * mult),
      0,
      1,
      0,
      720
    );

    pointsArr[i].add(createVector(angle, angle));

    if (dist(width / 2, height / 4, pointsArr[i].x, pointsArr[i].y) < 450)
      ellipse(pointsArr[i].x, pointsArr[i].y, radius);
  }

  console.log(pointsArr);
}
