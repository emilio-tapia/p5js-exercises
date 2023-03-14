let xspacing = 16; // Distancia entre posiciones horizontales
let w; // Ancho de la onda entera
let theta = 0.0; // Ángulo inicial en  0
let amplitude = 125.0; // Altura de la onda
let period = 500.0; // Cantidad de pixeles antes de que la onda se repita
let yvalues; // Uso de un arreglo para guardar los valores de altura de la onda
let setVariablePosition = 0;
let color1, color2;

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  // pixelDensity(2);

  // noFill();
  noStroke();

  color1 = color(210, 100, 100, 100);
  color2 = color(100, 100, 100, 100);

  w = width + 16;
  yvalues = new Array(floor(w / xspacing));
}

function draw() {
  background(230, 30, 23);

  calcWave();

  let x0 = width / 2 - setVariablePosition;
  let y0 = height / 2 - 200 - setVariablePosition;
  let x1 = width / 2;
  let y1 = height / 2 + 600;

  setLinearGradient(x0, y0, x1, y1);
  rect(width - width / 5, height / 2, 200, 200, 30);

  setRadialGradient(x0, y0, 500, x1, y1, 50);
  circle(width / 2, height / 2, 175, 175);

  setConicGradient(
    PI,
    width / 5 - setVariablePosition / 20,
    height / 2 - sin(setVariablePosition)
  );
  circle(width / 5, height / 2, 175, 175);
  shadow();
}

function setLinearGradient(x0, y0, x1, y1) {
  let gradient = drawingContext.createLinearGradient(x0, y0, x1, y1);

  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  drawingContext.fillStyle = gradient;
}

function setRadialGradient(sX, sY, sR, eX, eY, eR) {
  let gradient = drawingContext.createRadialGradient(sX, sY, sR, eX, eY, eR);

  let colorS = color(190, 200, 100, 100);
  let colorE = color(10, 10, 10, 100);

  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);

  drawingContext.strokeStyle = gradient;
}

function setConicGradient(sA, sX, sY) {
  let gradient = drawingContext.createConicGradient(sA, sX, sY);

  let color1 = color(35, 100, 100, 100);
  let color2 = color(250, 100, 100, 100);
  let color3 = color(35, 100, 100, 100);

  gradient.addColorStop(0, color1);
  gradient.addColorStop(0.5, color2);
  gradient.addColorStop(1, color3);

  drawingContext.fillStyle = gradient;
}

function calcWave() {
  // Incrementar theta (prueba valores distintos de
  // 'velocidad angular' aquí
  theta += 0.02; //frequency

  // Por cada valor de x, calcula un valor de y con la función sin()
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;

    setVariablePosition = yvalues[i] * 3; //set xPosition value
  }
}

function shadow() {
  drawingContext.shadowOffsetX = 10;
  drawingContext.shadowOffsetY = 10;
  drawingContext.shadowBlur = 16;
  drawingContext.shadowColor = color(230, 30, 18, 100);
}
