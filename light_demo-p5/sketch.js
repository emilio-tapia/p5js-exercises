function setup() {
  createCanvas(innerWidth, innerHeight, WEBGL);
}

function draw() {
  background(0);

  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;

  ambientLight(50);

  push();
  translate(-width / 4, 0, 0);
  rotateZ(frameCount * 0.02);
  rotateX(frameCount * 0.02);
  directionalLight(100, 100, 100, -0.3, -1, 0.5);
  specularMaterial(10);
  box(100, 100, 100);
  pop();

  translate(width / 4, 0, 0);
  directionalLight(100, 100, 100, -0.3, -1, 0.5);
  pointLight(150, 150, 150, locX, locY, 450);
  ambientMaterial(150);
  sphere(120, 64);
}
