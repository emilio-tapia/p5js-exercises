function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
}

let count = 0;

function draw() {
  background(20);
  stroke(250, 30);
  noFill();
  translate(width / 2, height / 2);
  let forward = true;

  if (count == 99) {
    forward = false;
    count = 0;
    // count--;
  } else if (count == 1) {
    forward = true;
  }
  if (forward) {
    count++;
    console.log(count);
  } else {
    count--;
  }

  // SIMPLE VERTEX SHAPE
  // beginShape();
  // vertex(-100, -100);
  // if (frameCount % Math.floor(random(5, 15)) == 0) {
  //   vertex(-100, count);
  //   vertex(100, 100);
  //   vertex(100, -100);
  // }
  // endShape(CLOSE);

  // beginShape();
  // vertex(-100, -100);
  // if (frameCount % Math.floor(random(8, 20)) == 0) {
  //   vertex(-110, 110);
  //   vertex(0, 0);
  //   vertex(110, 110);
  //   vertex(0, 0);
  //   vertex(count, -110);
  // }
  // endShape(CLOSE);

  // VERTEX SHAPE WITH FOR LOOP
  beginShape();
  for (let i = 0; i < 361; i++) {
    let radius = 440;
    let x = radius * cos(i);
    let y = radius * sin(i);
    vertex(x, y);
    vertex(x * 4 + random(x * -0.03), y * 4 + random(y * -0.03));
  }
  endShape();

  // VERTEX SHAPE WITH FOR LOOP
  beginShape();
  for (let i = 0; i < 361; i++) {
    let radius = 210;
    let x = radius * cos(i);
    let y = radius * sin(i);

    stroke(250, 60);
    vertex(x, y);
    vertex(x * 2 + random(x * -0.005), y * 2 + random(y * -0.005));
  }
  endShape();

  // VERTEX SHAPE WITH FOR LOOP
  beginShape();
  for (let i = 0; i < 361; i++) {
    let radius = 200;
    let x = radius * cos(i);
    let y = radius * sin(i);

    stroke(250, 180);
    vertex(x + random(x * 0.001), y + random(y * 0.001));
    vertex(radians(x) / 10, radians(y) / 10);
  }
  endShape();

  // // VERTEX SHAPE WITH FOR LOOP
  // beginShape();
  // for (let i = 0; i < 361; i += 360 / 10) {
  //   let radius = 150;
  //   let x = radius * cos(i);
  //   let y = radius * sin(i);

  //   if (frameCount % Math.floor(random(2, 5)) == 0) {
  //     pop();
  //     // strokeWeight(Math.floor(random(1, 3)));
  //     vertex(x, y);
  //     push();
  //   }
  // }
  // endShape();

  // // CURVE VERTEX SHAPE
  // stroke(250, 250, 0);
  // beginShape();
  // curveVertex(mouseX, mouseY);
  // curveVertex(0, 100);
  // curveVertex(100, 100);
  // curveVertex(400, 300);
  // endShape();
}
