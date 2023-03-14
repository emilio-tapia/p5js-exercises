/* By Steve's Makerspace
   Video: https://youtu.be/_9yK32iUHm0
   See note about color table at end.
   click on canvas = new; s for jpg
   Mess with variables below.  */

const LAYERS = 1;
const ALPHA = 10; //out of 255
const EXTRA_BLACK = 0; //1 for some black line and white fills; 0 for neither; -2 for fewer colors;
const EXTRA_BLACK_ALPHA = 05; //out of 255 - used if extraBlack=1 & lines, filling, colorLines all true, low alph, high sw
const ROTATION_STRIPE = 0; //rotation of each stripe; try 10 or 90;
const LINE_WIDTH = 1; //line width
const MIN_Y_CHANGE = 0; //these two ranges determine line overlap and width
const MAX_Y_CHANGE = 6;
let lines = true;
let colorFilter = 1; // 0 = no color; 1 = color
let colorRandom = false; //true = random color; false = color from palette table
let colorFill = true;
let strokeFill = false; //false for black lines
let r, g, b;
let table;

function preload() {
  table = loadTable('colors.csv', 'csv', 'header'); // PRELOAD COLOR
}

function setup() {
  let canv = createCanvas(innerWidth, innerHeight);

  canv.mousePressed(setup); // each click changes the art
  angleMode(DEGREES);

  if (lines == true) {
    stroke(0, 0, 0, EXTRA_BLACK_ALPHA);
    strokeWeight(LINE_WIDTH);
  } else {
    noStroke();
  } // CHECK LINES FOR STROKE

  let end = height / 2 + 500; //where lines stop
  let palette = floor(random(676)); // pick a random color

  for (let i = 0; i < LAYERS; i++) {
    let y1;

    //starting height for layer 1
    if (i == 0) {
      y1 = -height / 2 - 300;
    } else {
      y1 = -height / 2 + (height / LAYERS) * i;
    } // END IF i

    let y2 = y1,
      y3 = y1,
      y4 = y1,
      y5 = y1,
      y6 = y1; // ASSIGN TO Y COORDINATES FOR REST OF LINES

    let rotationLayer = random(180); //random layer rotation
    let rotationStripe = 180;

    //keep going until all the lines are at the bottom
    while (
      (y1 < end) &
      (y2 < end) &
      (y3 < end) &
      (y4 < end) &
      (y5 < end) &
      (y6 < end) &
      (-MAX_Y_CHANGE < MIN_Y_CHANGE)
    ) {
      y1 += random(MIN_Y_CHANGE, MAX_Y_CHANGE); // Y + RANDOM CHANGE = CURVY LINE
      y2 += random(MIN_Y_CHANGE, MAX_Y_CHANGE);
      y3 += random(MIN_Y_CHANGE, MAX_Y_CHANGE);
      y4 += random(MIN_Y_CHANGE, MAX_Y_CHANGE);
      y5 += random(MIN_Y_CHANGE, MAX_Y_CHANGE);
      y6 += random(MIN_Y_CHANGE, MAX_Y_CHANGE);

      // PICK COLOR RANDOM OR CSV TABLE
      if (colorRandom == true) {
        r = random(256);
        g = random(256);
        b = random(256);
      } else {
        let col = floor(random(5 + EXTRA_BLACK));
        r = table.get(palette, col * 3);
        g = table.get(palette, col * 3 + colorFilter);
        b = table.get(palette, col * 3 + colorFilter); // original is + 2
      } // END IF colRand

      if (colorFill == true) {
        fill(r, g, b, ALPHA);
      } else {
        noFill();
      } // END IF filling

      if (strokeFill == true) {
        stroke(r, g, b, ALPHA);
      } // END IF colorLines

      push();
      translate(width / 2, height / 2);
      rotationStripe += ROTATION_STRIPE; //rotating after each stripe
      rotate(rotationStripe + rotationLayer);
      let xStart = -width / 2; // starting point in X

      beginShape(); // START TO DRAW
      curveVertex(xStart - 300, height / 2 + 500);
      curveVertex(xStart - 300, y1); //LAYER 1
      curveVertex(xStart + (width / 5) * 1, y2 - random(mouseX / 2)); //LAYER 2
      curveVertex(xStart + (width / 5) * 2, y3); //LAYER 3
      curveVertex(xStart + (width / 5) * 3, y4 - random(mouseY / 2)); //LAYER 4
      curveVertex(xStart + (width / 5) * 4, y5); //LAYER 5
      curveVertex(width / 2 + 300, y6);
      curveVertex(width / 2 + 300, height / 2 + 500);
      endShape(CLOSE);

      pop();
    } // END WHILE LOOP
  } // END FOR LOOP - LAYERS
}

function keyTyped() {
  if (key === 's') {
    save('myCanvas.jpg');
  }
}

/* You are welcome to use the color table, but should probably credit me and the info below.
    Table obtained by scanning the nice-color-palette.png image located here: https://github.com/federico-pepe/nice-color-palettes
    ... which was created by that author from the top color palettes on ColourLovers.com. I did not use any of the code from the nice-color-palettes app.  */
