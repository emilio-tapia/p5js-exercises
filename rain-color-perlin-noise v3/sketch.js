/* GLOBAL VARIABLES */
const colorInc = 1.5; // Color change speed
const SAT = 5; // saturation max 100
const BRIGHT = 30; // brightness max 100
const ALPHA = 110; // alpha max 100
const PARTICLE_NUMBER = 300; // number of particles
let PARTICLE_STROKE = 2; // line width
const ANGLE_MULTIPLIER = 3; // 0.1 = straighter lines; 25+ = sharp curves
let ANGLE_TURN = 1; // adjust angle for straight lines (after adjusting angMult)
const INCREMENT = 0.1; // randomness noise in x,y,z
const SCALE = 20;
const zOffInc = 0.0003; // speed of vector changes
var zoff = 0;
var hu = 40;
let colums, rows;
let frameHTML;
let particlesArray = []; //Particles array
let flowfield;
let playState = 1;

/* SETUP INIT */
function setup() {
  // createCanvas(window.innerWidth, window.innerHeight); //windowWidth-20, windowHeight-20);

  let canv = createCanvas(windowWidth, windowHeight);

  canv.mousePressed(setup); // each click changes the art
  colorMode(HSB, 359, 10, 50, 150);
  frameHTML = createP('');

  colums = floor(width / SCALE); // returns 50
  rows = floor(height / SCALE); // returns 50

  flowfield = new Array(colums * rows); //create array with 50x50 length

  let context = drawingContext; // or p5.drawingContext
  context.shadowOffsetX = 5;
  context.shadowOffsetY = -5;
  context.shadowBlur = 20;
  context.shadowColor = '#FFFFFF80';

  for (var i = 0; i < PARTICLE_NUMBER; i++) {
    particlesArray[i] = new Particle();
  }
  background(10);
}

/* DRAW ANIMATION FRAME */
function draw() {
  if (playState > 0) {
    let yoff = 0;
    let xoff = 0;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < colums; x++) {
        const INDEX = x + y * colums;
        PARTICLE_STROKE = random(1, 3);
        var angle = noise(xoff, yoff, zoff) * ANGLE_MULTIPLIER + ANGLE_TURN; //random angle affected by noise
        var vector = p5.Vector.fromAngle(angle);
        vector.setMag(1);
        flowfield[INDEX] = vector;
        xoff += INCREMENT; //START CURLYNESS IN X
      }

      yoff += INCREMENT; //START CURLYNESS IN Y

      zoff += zOffInc; //START CURLYNESS IN Z
    }

    for (var i = 0; i < particlesArray.length; i++) {
      particlesArray[i].follow(flowfield);
      particlesArray[i].update();
      particlesArray[i].edges();
      particlesArray[i].show();
    }

    // frameHTML.html(floor(frameCount));

    hu += colorInc;
    if (hu > 100) {
      hu = 40;
    }
  }
}

// function mousePressed() {
//   playState = playState * -1; // PAUSE ANIMATION
// }

// Save art as jpg.
function keyTyped() {
  if (key === 's') {
    save('myCanvas.jpg');
  }
}

// FORKED CODE FROM
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/BjoM9oKOAKY
