let canvasChild1,
  font,
  bgImage,
  petals = [],
  smallPetals = [];

function preload() {
  bgImage = loadImage(
    'https://images.unsplash.com/photo-1551829142-d9b8cf2c9232?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
  );
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  textSize(128);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  stroke(71, 53, 86);
  strokeWeight(5);
  fill(71, 53, 86);

  canvasChild1 = createGraphics((width * 2) / 3, (height * 2) / 3);
  canvasChild1.colorMode(HSB, 360, 100, 100, 100);
  canvasChild1.rectMode(CENTER);
  canvasChild1.textAlign(CENTER, CENTER);
  canvasChild1.stroke(255);
  // canvasChild1.strokeWeight(5);
  canvasChild1.fill(255);
  canvasChild1.imageMode(CENTER);

  for (let i = 0; i < 3; i++) {
    let num = 6 - i * 2;
    for (let j = 0; j < num; j++) {
      smallPetals.push(new Petal(3 + 5 * i, 5 + 6 * i));
    }
    petals.push(smallPetals);
    smallPetals = [];
  }
}

function draw() {
  background(3, 48, 93);
  image(bgImage, width / 2, height / 2);

  canvasChild1.background(347, 6, 99);

  canvasChild1.erase();
  canvasChild1.textSize(128);
  canvasChild1.text(
    'Zakura',
    canvasChild1.width / 2,
    canvasChild1.height - canvasChild1.height / 8
  );
  canvasChild1.textSize(128 / 2);
  canvasChild1.text('名誉', canvasChild1.width / 4.75, canvasChild1.height / 8);
  canvasChild1.noErase();

  for (let i = 0; i < petals.length; i++) {
    for (let j = 0; j < petals[i].length; j++) {
      petals[i][j].show(canvasChild1, i * 5, i * 35);
      petals[i][j].descend();
      petals[i][j].reload(canvasChild1);
    }
  }

  image(canvasChild1, width / 2, height / 2);
}
