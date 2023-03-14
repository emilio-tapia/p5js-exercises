function setup() {
  createCanvas(innerWidth, innerHeight);
  rectMode(CENTER);
  stroke(237, 228, 204);
  fill(179, 179, 96);
  strokeWeight(24);
}

function draw() {
  background(173, 123, 78);
  translate(width / 2, height / 2);

  rotate(millis() / 1000);
  rect(0, 0, 300, 300, 30);
  drawingContext.filter = 'blur(12px)';
  // filter(BLUR, 12);//Compare with this p5.js filter function!!!

  console.log('Frame rate: ' + frameRate());
}
