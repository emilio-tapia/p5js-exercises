const pointsArr = []; // Main Array
let sliderRadius, sliderColor, sliderMult, sliderMask; // Slider Declaration
let max; // Maximun Iterations
let r1, r2, r3; // Random Variable Color

function setup() {
  let canv = createCanvas(windowWidth, windowHeight);

  canv.mousePressed(setup); // each click changes the art

  background(40);
  angleMode(DEGREES);
  // noiseDetail(1);

  // Slider DOM
  sliderRadius = createSlider(1, 5, 1, 0.1);
  sliderRadius.style('width', `${width / 10}px`);
  sliderRadius.style('fill', `#eee`);
  sliderRadius.position(width - width / 10 - width / 50, 0 + height * 0.05);

  sliderColor = createSlider(1, 255, 50, 0.1);
  sliderColor.style('width', `${width / 10}px`);
  sliderColor.style('fill', `#eee`);
  sliderColor.position(width - width / 10 - width / 50, 0 + height * 0.1);

  sliderMult = createSlider(0.0001, 0.1, 0.01, 0.001);
  sliderMult.style('width', `${width / 10}px`);
  sliderMult.style('fill', `#eee`);
  sliderMult.position(width - width / 10 - width / 50, 0 + height * 0.15);

  sliderMask = createSlider(100, 700, 200, 0.01);
  sliderMask.style('width', `${width / 10}px`);
  sliderMask.style('fill', `#eee`);
  sliderMask.position(width - width / 10 - width / 50, 0 + height * 0.2);

  const density = 40; // Lines details
  const space = width / density; //Spacing between lines

  for (let x = 0; x < width; x += space) {
    for (let y = 0; y < height; y += space) {
      // Vector create & push to main array
      let p = createVector(x + random(-10, 10), y + random(-10, 10));
      pointsArr.push(p);
    }
  }

  shuffle(pointsArr, true); // Start the loop or lines in random order
}

function draw() {
  noStroke();

  // Random Values each draw
  r1 = random(0, 255);
  r2 = random(0, 255);
  r3 = random(100, 255);

  if (frameCount * 5 <= pointsArr.length) {
    // Get the max number condition
    max = frameCount * 5;
  } else {
    max = pointsArr.length;
  }

  for (let i = 0; i < max; i++) {
    // Main for loop

    // Color fill + alpha interpolations
    const r = map(pointsArr[i].x, 0, height, r3, 50);
    const g = map(pointsArr[i].y, 0, width, r3, 250);
    const b = map(pointsArr[i].x, 0, height, r3, 250);
    const alpha = map(
      dist(width / 2, height / 2, pointsArr[i].x, pointsArr[i].y),
      0,
      350,
      200,
      250
    );
    fill(r / 2 + sliderColor.value(), r % 80, b - sliderColor.value(), alpha);

    // Angle noise interpolation for creating vector movements
    let angle = map(
      noise(
        pointsArr[i].x * sliderMult.value(),
        pointsArr[i].y * sliderMult.value()
      ),
      0,
      1,
      0,
      720
    );

    pointsArr[i].add(createVector(cos(angle), sin(angle))); // Insert to the array vector

    // Limiting/Masking into a circle the lines
    if (
      dist(width / 2, height / 2, pointsArr[i].x, pointsArr[i].y) <
      sliderMask.value()
    )
      ellipse(pointsArr[i].x, pointsArr[i].y, sliderRadius.value());
  }
}

// function doubleClicked() {
//   saveCanvas('flowfield', 'png');
// }

// Save art as jpg.
function keyTyped() {
  if (key === 's') {
    save('myCanvas.jpg');
  }
}
