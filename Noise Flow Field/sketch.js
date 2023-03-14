const pointsArr = [];
const radius = 1;
// const mult = 0.0001;
let mult, max;

let r1, r2, r3;

function setup() {
  let canv = createCanvas(windowWidth, windowHeight);

  canv.mousePressed(setup); // each click changes the art
  background(40);
  angleMode(RADIANS);
  noiseDetail(1);
  const density = 40;
  const space = height / density;

  for (let x = 0; x < width; x += space) {
    for (let y = 0; y < height; y += space) {
      let p = createVector(x, y);
      pointsArr.push(p);
    }
  }

  r1 = random(0, 255);
  r2 = random(0, 255);
  r3 = random(100, 255);
}

function draw() {
  noStroke();
  mult = random(0.00005, 0.0001);

  if (frameCount * 15 <= pointsArr.length) {
    // Get the max number condition
    max = frameCount * 15;
  } else {
    max = pointsArr.length;
  }

  for (let i = 0; i < max; i++) {
    const r = map(pointsArr[i].x, 0, width, 255, r3);
    const g = map(pointsArr[i].y, 0, height, 250, r1);
    const b = map(pointsArr[i].x, 0, height, r3, r2);
    const alpha = map(
      dist(width / 2, height / 2, pointsArr[i].x, pointsArr[i].y),
      0,
      350,
      250,
      50
    );

    fill(r, g, b, alpha - random(150));

    let angle = map(
      noise(pointsArr[i].x * mult, pointsArr[i].y * mult),
      0,
      1,
      0,
      720
    );

    pointsArr[i].add(createVector(cos(angle), sin(angle)));

    if (dist(width / 2, height / 2, pointsArr[i].x, pointsArr[i].y) < 300)
      ellipse(pointsArr[i].x, pointsArr[i].y, radius);
  }
}

// Save art as jpg.
function keyTyped() {
  if (key === 's') {
    save('myCanvas.jpg');
  }
}
