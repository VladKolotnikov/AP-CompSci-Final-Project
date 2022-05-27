let gravity = function(p) {
  class Mover  {
    constructor(x,y){
      this.pos = p.createVector(x,y)
      this.vel = p5.Vector.random2D()
      this.vel.mult(p.random(3))

    }

    update(){
      let mouse = p.createVector(p.mouseX, p.mouseY)
      this.acc = p5.Vector.sub(mouse, this.pos)
      this.acc.setMag(.5)
      this.pos.add(this.vel)
      this.vel.add(this.acc)
      this.vel.limit(5)

    }
    show(){
      p.stroke(255)
      p.strokeWeight(2)
      p.fill(255, 100)
      p.ellipse(this.pos.x, this.pos.y,25)
    }
  }

  let mover
  p.setup = function() {
    p.createCanvas(400, 400)
    mover = new Mover(200, 200)
  }
  p.draw = function() {
    p.background(0)
    mover.update()
    mover.show()
  }

}
let gravity1 = new p5(gravity, "gravity")


let collide = function(p) {
  class Mover  {
    constructor(x,y,m){
      this.pos = p.createVector(x,y)
      this.vel = p.createVector(0, 0)
      this.acc = p.createVector(0, 0)
      this.mass = m
      this.r = p.sqrt(this.mass)*10
      // this.vel = p5.Vector.random2D()

    }
    friction(){
      let diff = p.height - (this.pos.y + this.r)
      if (diff<1){
        console.log('friction');
        let friction = this.vel.copy();
        friction.normalize()
        friction.mult(-1)
        let normal = this.mass
        friction.setMag(mu*normal)
        this.applyForce(friction)
      }
    }
    applyForce(force){
      let f = p5.Vector.div(force, this.mass)
      this.acc.add(f)
    }
    edges(){
      if (this.pos.y >= p.height-this.r){
        this.pos.y = p.height-this.r
        this.vel.y*=-1
      }
      if (this.pos.x >= p.width-this.r){
        this.pos.x = p.width-this.r
        this.vel.x*=-1
      }
      if (this.pos.x <= this.r){
        this.pos.x = this.r
        this.vel.x*=-1
      }
    }
    collide(){
      for (var x = 0; x < movers.length; x++) {
        for (var y = 0; y < movers.length; y++) {
          if(x!=y){
            if(p5.Vector.sub(movers[x].pos, movers[y].pos).mag()<= movers[x].r+movers[y].r){
                let tempX = movers[x].vel.mag()
                // let tempY = movers[y].vel.mag()
                // console.log(movers[x].vel.mag());
                movers[x].vel = p5.Vector.sub(movers[x].pos,movers[y].pos).normalize().mult(tempX)
                // movers[y].vel = p5.Vector.sub(movers[y].pos,movers[y].pos).normalize().mult(tempY)
                // movers[x].vel.mult(-1)
                // movers[y].vel.mult(-1)
            }
          }
        }
      }
      // for (let mover of movers){
        // for(let i = 0; i<movers.length+1; i++){
          // if(p5.Vector.sub(mover.pos, movers[2].pos).mag()<=mover.r+movers[2].r){
            // console.log(p5.Vector.sub(mover.pos, movers[2].pos).mag());
          // }
        }
    //   }
    // }
    update(){
      // let mouse = createVector(mouseX, mouseY)
      // this.acc = p5.Vector.sub(mouse, this.pos)
      // this.acc.setMag(.5)
      this.vel.add(this.acc)
      this.pos.add(this.vel)
      this.acc.setMag(0)
    }

    show(){
      p.stroke(255)
      p.strokeWeight(2)
      p.fill(255, 100)
      p.ellipse(this.pos.x, this.pos.y,this.r*2)
    }
  }
  let movers = []
  let mu = 0.1
  p.setup =function() {
    p.createCanvas(400, 400)
    for(let i = 0; i < 4; i++){
      movers[i] = new Mover(p.random(50, 350), 200,p.random(1,8))
    }

  }
  p.draw = function() {
    p.background(0)
    for (let mover of movers) {
    let gravity = p.createVector(0,0.1)
    let weight = p5.Vector.mult(gravity, mover.mass)
    let wind = p.createVector(0.1,0)
    if(p.mouseIsPressed){
      mover.applyForce(wind)
    }

    // if (p5.Vector.sub(moverA.pos, moverB.pos).mag()<=36){
    //   // console.log(p5.Vector.sub(moverA.pos, moverB.pos).mag());
    //
    //   console.log('collide');
    //   tempA = moverA.vel.mag()
    //   tempB = moverB.vel.mag()
    //   moverA.vel = p5.Vector.sub(moverA.pos,moverB.pos).normalize().mult(tempA)
    //   moverB.vel = p5.Vector.sub(moverB.pos,moverA.pos).normalize().mult(tempB)
    //   // moverA.vel.mult(-1)
    //   // moverB.vel.mult(-1)
    // }
    mover.applyForce(weight)
    mover.update()
    mover.edges()
    mover.show()
    mover.friction()
    mover.collide()
  }
   }
}
let collide1 = new p5(collide, "collide")
let drag = function(p) {
  class Mover  {
    constructor(x,y,m){
      this.pos = p.createVector(x,y)
      this.vel = p.createVector(0, 0)
      this.acc = p.createVector(0, 0)
      this.mass = m
      this.r = p.sqrt(this.mass)*10
      // this.vel = p5.Vector.random2D()

    }
    drag(ro){
        console.log(ro);
        let drag = this.vel.copy();
        drag.normalize()
        drag.mult(-1)

        let speedSq = this.vel.magSq()
        drag.setMag(speedSq*ro)
        this.applyForce(drag)

      }

    applyForce(force){
      let f = p5.Vector.div(force, this.mass)
      this.acc.add(f)
    }
    edges(){
      if (this.pos.y >= p.height-this.r){
        this.pos.y = p.height-this.r
        this.vel.y*=-1
      }
      if (this.pos.x >= p.width-this.r){
        this.pos.x = p.width-this.r
        this.vel.x*=-1
      }
      if (this.pos.x <= this.r){
        this.pos.x = this.r
        this.vel.x*=-1
      }
    }
    // collide(){
    //   for (var x = 0; x < movers.length; x++) {
    //     for (var y = 0; y < movers.length; y++) {
    //       if(x!=y){
    //         if(p5.Vector.sub(movers[x].pos, movers[y].pos).mag()<= movers[x].r+movers[y].r){
    //             let temp = movers[x].vel.mag()
    //             // let tempY = movers[y].vel.mag()
    //             // console.log(movers[x].vel.mag());
    //             movers[x].vel = p5.Vector.sub(movers[x].pos,movers[y].pos).normalize().mult(temp)
    //             // movers[y].vel = p5.Vector.sub(movers[y].pos,movers[y].pos).normalize().mult(tempY)
    //             // movers[x].vel.mult(-1)
    //             // movers[y].vel.mult(-1)
    //         }
    //       }
    //     }
    //   }
    //   // for (let mover of movers){
    //     // for(let i = 0; i<movers.length+1; i++){
    //       // if(p5.Vector.sub(mover.pos, movers[2].pos).mag()<=mover.r+movers[2].r){
    //         // console.log(p5.Vector.sub(mover.pos, movers[2].pos).mag());
    //       // }
    //     }
    //   }
    // }
    update(){
      // let mouse = createVector(mouseX, mouseY)
      // this.acc = p5.Vector.sub(mouse, this.pos)
      // this.acc.setMag(.5)
      this.vel.add(this.acc)
      this.pos.add(this.vel)
      this.acc.setMag(0)
    }

    show(){
      p.stroke(255)
      p.strokeWeight(2)
      p.fill(255, 100)
      p.ellipse(this.pos.x, this.pos.y,this.r*2)
    }
  }
  let movers = []
  let mu = 0.1

  p.setup=function() {
    p.createCanvas(400, 400)
    for(let i = 0; i < 8; i++){
      movers[i] = new Mover(p.random(50, 350), 200,p.random(1,8))
    }
  }
  p.draw=function() {
    p.background(0)
    p.fill(255, 125)
    p.noStroke()
    p.rect(0, 2*p.height/3, p.width, p.height/3)
    for (let mover of movers) {
      let gravity = p.createVector(0,0.1)
      let weight = p5.Vector.mult(gravity, mover.mass)
      let wind = p.createVector(0.1,0)
      if(p.mouseIsPressed){
        mover.applyForce(wind)
      }
      mover.applyForce(weight)
      if (mover.pos.y > 2*p.height/3){
        console.log('hi');
        mover.drag(1)
      } else {
        mover.drag(0.01)
      }
      mover.update()
      mover.edges()
      mover.show()
    }

  }
}
let drag1 = new p5(drag, 'drag')
let gravityMultiple = function (p) {
  class Mover {
    constructor(x, y, m) {
      this.m = m;
      this.pos = p.createVector(x, y);
      this.vel = p5.Vector.random2D();
      this.acc = p.createVector(0, 0);
    }

    applyForce(force) {
      let f = p5.Vector.div(force, this.m);
      this.acc.add(f);
    }

    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    show() {
      p.stroke(255);
      p.fill(255,255,255,100);
      p.ellipse(this.pos.x, this.pos.y, this.m * 16);
    }

    attract(other) {
      // Calculate direction of force
      let force = p5.Vector.sub(this.pos, other.pos);
      // Distance between objects
      let distance = force.mag();
      // Limiting the distance to eliminate "extreme" results for very close or very far objects
      distance = p.constrain(distance, 5.0, 25.0);

      // Calculate gravitional force magnitude
      let strength = (G * this.m * other.m) / (distance * distance);
      // Get force vector --> magnitude * direction
      force.setMag(strength);
      return force;
    }
  }
  let movers = [];

  let G = 3;

  p.setup = function() {
    p.createCanvas(400, 400);
    for (let i = 0; i < 10; i++) {
      movers[i] = new Mover(p.random(p.width), p.random(p.height), p.random(0.5, 2));
    }
  }

  p.draw=function() {
    p.background(0);

    for (let i = 0; i < movers.length; i++) {
      for (let j = 0; j < movers.length; j++) {
        if (i !== j) {
          let force = movers[j].attract(movers[i]);
          movers[i].applyForce(force);
        }
      }

      movers[i].update();
      movers[i].show();
    }
  }
}

let gravityMultiple1 = new p5(gravityMultiple,"gravityMultiple")
