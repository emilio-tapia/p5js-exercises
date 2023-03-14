let xspacing = 16; // Distancia entre posiciones horizontales
let w; // Ancho de la onda entera
let theta = 0.0; // Ángulo inicial en  0
let amplitude = 125.0; // Altura de la onda
let period = 500.0; // Cantidad de pixeles antes de que la onda se repita
let yvalues; // Uso de un arreglo para guardar los valores de altura de la onda
let setVariablePosition;
let color1, color2;

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  // pixelDensity(2);

  noFill();
  strokeWeight(40);

  color1 = color(210, 100, 100, 100);
  color2 = color(100, 100, 100, 100);

  w = width + 16;
  yvalues = new Array(floor(w / xspacing));
}

function draw() {
  background(230, 30, 23);

  // let wave = noise(frameCount);
  // console.log(wave);

  // let waveMap = map(wave, -1, 1, 0, 200);

  calcWave();

  let x0 = width / 2 - setVariablePosition;
  let y0 = height / 2 - 200 - setVariablePosition;
  let x1 = width / 2;
  let y1 = height / 2 + 600;

  setLinearGradient(x0, y0, x1, y1);
  rect(width / 2, height / 2, 400, 400, 50);

  setRadialGradien(x0, y0, 500, x1, y1, 120);
  circle(width / 2, height / 2, 175, 175);
}

function setLinearGradient(x0, y0, x1, y1) {
  let gradient = drawingContext.createLinearGradient(x0, y0, x1, y1);

  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  drawingContext.strokeStyle = gradient;
}

function setRadialGradien(sX, sY, sR, eX, eY, eR) {
  let gradient = drawingContext.createRadialGradient(sX, sY, sR, eX, eY, eR);

  let colorS = color(190, 100, 100, 100);
  let colorE = color(310, 100, 100, 100);

  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);

  drawingContext.strokeStyle = gradient;
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
