// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html

// Steve's Makerspace added color, put some variables at the top, added click on canvas to pause, and added hit "s" to print canvas to jpg.  Play with variables below, lines 7 - 15.
// https://youtu.be/CSMcrKouQ3o

/* GLOBAL VARIABLES */
const colorInc = 0.5; // Color change speed
const SAT = 100; // saturation max 100
const BRIGHT = 100; // brightness max 100
const ALPHA = 10; // alpha max 100
const PARTICLE_NUMBER = 300; // number of particles
const PARTICLE_STROKE = 1; // line width
const ANGLE_MULTIPLIER = 3; // 0.1 = straighter lines; 25+ = sharp curves
const ANGLE_TURN = 1; // adjust angle for straight lines (after adjusting angMult)
const INCREMENT = 0.1; // randomness noise in x,y,z
const SCALE = 10;
const zOffInc = 0.0003; // speed of vector changes
var zoff = 0;
var hu = 0;
let colums, rows;
let frameHTML;
let particlesArray = []; //Particles array
let flowfield;
let playState = 1;

/* SETUP INIT */
function setup() {
  // createCanvas(500, 500); //windowWidth-20, windowHeight-20);

  let canv = createCanvas(windowWidth, windowHeight);

  canv.mousePressed(setup); // each click changes the art
  colorMode(HSB, 359, 100, 100, 100);
  frameHTML = createP('');

  colums = floor(width / SCALE); // returns 50
  rows = floor(height / SCALE); // returns 50

  flowfield = new Array(colums * rows); //create array with 50x50 length

  for (var i = 0; i < PARTICLE_NUMBER; i++) {
    particlesArray[i] = new Particle();
  }
  background(90);
}

/* DRAW ANIMATION FRAME */
function draw() {
  if (playState > 0) {
    let yoff = 0;
    let xoff = 0;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < colums; x++) {
        const INDEX = x + y * colums;
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

    frameHTML.html(floor(frameCount));

    hu += colorInc;
    if (hu > 359) {
      hu = 0;
    }
  }
}

function mousePressed() {
  playState = playState * -1; // PAUSE ANIMATION
}

// Save art as jpg.
function keyTyped() {
  if (key === 's') {
    save('myCanvas.jpg');
  }
}
