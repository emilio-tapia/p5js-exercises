let font,
  wall,
  offset = 0;

function preload() {
  font = loadFont('./Sacramento-Regular.ttf');
  wall = loadImage('./img.jpg');
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB, 360, 100, 100, 100);
  textFont(font);
  textAlign(CENTER, CENTER);
  textSize(128);
  imageMode(CENTER);
  background(20);
  // pixelDensity(2);
  frameRate(60);

  noFill();
  stroke(255);
  strokeWeight(3);
}

function draw() {
  tint(0, 0, 40, 100);
  image(wall, width / 2, height / 2);

  let alpha = flicker();
  textNeon(color(332, 58, 91, alpha));
}

function textNeon(glowColor) {
  glow(glowColor, 0);
  text('Chupapoto', width / 2, height / 2);
  // console.log(flicker());
  glow(glowColor, 400);
  text('Chupapoto', width / 2, height / 2);
  text('Chupapoto', width / 2, height / 2);
  glow(glowColor, 80);
  text('Chupapoto', width / 2, height / 2);
  text('Chupapoto', width / 2, height / 2);
  glow(glowColor, 12);
  text('Chupapoto', width / 2, height / 2);
  text('Chupapoto', width / 2, height / 2);
  // tint(0, 0, 100, 100);
}

function flicker() {
  let n = random(1);
  // let n = noise(offset);
  if (n < 0.3) return random(50, 70);
  else return 100;
}

function glow(glowColor, blur) {
  drawingContext.shadowBlur = blur;
  drawingContext.shadowColor = glowColor;
}
