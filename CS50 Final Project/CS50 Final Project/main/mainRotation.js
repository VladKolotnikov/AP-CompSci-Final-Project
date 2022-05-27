let rotation = function(p){
  let angle = 0
  let angleV = 0
  let angleA = 0
  p.setup = function() {
    p.createCanvas(400, 400)
    p.angleMode(p.RADIANS)
  }
  p.draw = function() {
    angleA = p.map(p.mouseX, 0, p.width, -0.01, 0.01 )
    p.background(0)
    p.stroke(255)
    p.fill(255,255,255,100)
    p.rectMode(p.CENTER)
    p.translate(200, 200)
    p.rotate(angle)
    p.rect(0,0, 256, 32)
    angle+=angleV
    angleV+=angleA
  }
}
let rotation1 = new p5(rotation,"rotation")

let gravityRotation = function(p){
  class Attractor {
    constructor() {
      this.pos = p.createVector(p.width / 2, p.height / 2);
      this.m = 20;
      this.G = 1;
    }

    attract(mover) {
      // Calculate direction of force
      let force = p5.Vector.sub(this.pos, mover.pos);
      // Distance between objects
      let distance = force.mag();
      // Limiting the distance to eliminate "extreme" results for very close or very far objects
      distance = p.constrain(distance, 5, 25);

      // Calculate gravitional force magnitude
      let strength = (this.G * this.m * mover.m) / (distance * distance);
      // Get force vector --> magnitude * direction
      force.setMag(strength);
      return force;
    }

    // Method to display
    display() {
      p.ellipseMode(p.CENTER);
      p.stroke(0);
      // if (this.dragging) {
      //   fill(50);
      // } else if (this.rollover) {
      //   fill(100);
      // } else {
        p.fill(255,0,0, 100);
      // }
      p.ellipse(this.pos.x, this.pos.y, this.m * 2);
    }
  }
  class Mover {

    constructor(x, y, mass) {
      this.m = mass;
      this.r = this.m * 8;
      this.pos = p.createVector(x, y);
      this.angle = 0;
      this.angleV = 0;
      this.angleA = 0;
      this.vel = p.createVector(p.random(-1, 1), p.random(-1, 1));
      this.acc = p.createVector(0, 0);
    }

    applyForce(force) {
      let f = p5.Vector.div(force, this.m);
      this.acc.add(f);
    }

    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      // this.angleA = this.acc.y / 50.0;
      // this.angleV += this.angleA;
      // this.angleV = constrain(this.angleV, -0.1, 0.1);
      // this.angle += this.angleV;
      this.acc.mult(0);
    }

    display() {
      p.stroke(255);
      p.fill(255, 100);
      p.rectMode(p.CENTER);
      p.push();
      p.translate(this.pos.x, this.pos.y);
      this.angle = this.vel.heading( )
      p.rotate(this.angle);
      p.triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0)
      // ellipse(0, 0, this.r * 2);
      // line(0, 0, this.r, 0);
      p.pop();
    }
  }
  let movers = [];
  let attractor;

  p.setup = function() {
    p.createCanvas(400, 400);

    for (let i = 0; i < 10; i++) {
      movers.push(new Mover(p.random(p.width), p.random(p.height), p.random(0.5, 2)));
    }
    attractor = new Attractor();
  }

  p.draw=function() {
    p.background(0);

    attractor.display();

    for (let i = 0; i < movers.length; i++) {
      let force = attractor.attract(movers[i]);
      movers[i].applyForce(force);

      movers[i].update();
      movers[i].display();
    }
  }
}
let gravityRotation1 = new p5(gravityRotation, "gravityRotation")
