const pointsArr = []; // Main Array
let sliderRadius, sliderColor, sliderMult, sliderMask; // Slider Declaration
let max; // Maximun Iterations
let r3; // Random Variable Color

// function mouseMoved() {
//   let p = createVector(mouseX + random(-10, 10), mouseY + random(-10, 10));
//   pointsArr.push(p);
// }

function setup() {
  let canv = createCanvas(windowWidth, windowHeight);
  frameRate(60);

  // canv.mouseMoved(setup); // each click changes the art

  background(240);
  angleMode(DEGREES);
  // noiseDetail(1);

  // Slider DOM
  sliderRadius = 1;

  sliderMult = 0.0001;

  const density = 40; // Lines details
  const space = width / density; //Spacing between lines

  for (let x = 0; x < width * 2; x += space) {
    for (let y = 0; y < height * 2; y += space) {
      // Vector create & push to main array
      let p = createVector(
        x + random(-10, 10) - width / 8,
        y - random(-10, 10) - height / 8
      );
      pointsArr.push(p);
    }
  }

  // shuffle(pointsArr, true); // Start the loop or lines in random order
}

function draw() {
  noStroke();

  // sliderMult += random(0.0000001);

  // Random Values each draw
  r3 = random(100, 255);

  if (frameCount * 10 <= pointsArr.length) {
    // Get the max number condition
    max = frameCount * 10;
  } else {
    max = pointsArr.length;
  }

  for (let i = 0; i < max; i++) {
    // Main for loop

    // Color fill + alpha interpolations
    const r = map(pointsArr[i].x, 0, height, 0, 0);
    const g = map(pointsArr[i].y, 0, width, 0, 0);
    const b = map(pointsArr[i].y, 0, height, r3, 250);
    const alpha = map(
      dist(width / 2, height / 2, pointsArr[i].x, pointsArr[i].y),
      0,
      350,
      0,
      9
    );
    fill(r / 2, g % 80, b - random(1, 15), alpha);

    // Angle noise interpolation for creating vector movements
    let angle = map(
      noise(pointsArr[i].x * sliderMult, pointsArr[i].y * sliderMult),
      0,
      1,
      0,
      width
    );

    pointsArr[i].add(createVector(cos(angle), sin(angle))); // Insert to the array vector

    ellipse(pointsArr[i].x, pointsArr[i].y, sliderRadius);
  }
}

// console.log(frameRate());
