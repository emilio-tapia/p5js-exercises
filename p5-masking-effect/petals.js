class Petal {
  constructor(minR, maxR) {
    this.min_R = minR;
    this.max_R = maxR;
    this.radius = random(this.min_R, this.max_R);
    this.location = createVector(random(0, width), random(0, height));
    this.velocity = createVector(
      map(
        this.radius,
        this.min_R,
        this.max_R,
        -this.min_R / 1.5,
        -this.max_R / 1.5
      ),
      map(this.radius, this.min_R, this.max_R, this.min_R / 3, this.max_R / 3)
    );
    this.angle = 1;
    this.aAdd = map(noise(random(100)), 0, 1, -0.02, 0.02);
  }

  show(canvas, blurAmount, i) {
    canvas.erase(100 - i, 100);
    canvas.push();
    canvas.translate(this.location.x, this.location.y);
    canvas.beginShape();
    this.pRotate(canvas);
    canvas.drawingContext.filter = `blur(${blurAmount}px)`;
    canvas.vertex(0, -this.radius * 1.5);
    canvas.vertex(this.radius * 0.5, -this.radius * 2);
    canvas.vertex(this.radius * 0.9, -this.radius);
    canvas.vertex(this.radius, 0);
    canvas.vertex(this.radius * 0.7, this.radius);
    canvas.vertex(0, this.radius * 2);
    canvas.vertex(-this.radius * 0.7, this.radius);
    canvas.vertex(-this.radius, 0);
    canvas.vertex(-this.radius * 0.9, -this.radius);
    canvas.vertex(-this.radius * 0.5, -this.radius * 2);
    canvas.endShape();
    canvas.pop();
    canvas.noErase();
  }

  descend() {
    this.location.add(this.velocity);
  }

  reload(canvas) {
    if (this.location.y > canvas.height + this.radius * 2) {
      this.location = createVector(
        random(0, canvas.width * 1.5),
        0 - this.radius * 2
      );
      this.angle = 1;
    }
  }

  pRotate(canvas) {
    this.angle += this.aAdd;
    canvas.rotate(this.angle);
  }
}
