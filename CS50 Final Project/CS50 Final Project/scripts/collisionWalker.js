class Mover  {
  constructor(x,y,m){
    this.pos = createVector(x,y)
    this.vel = createVector(0, 0)
    this.acc = createVector(0, 0)
    this.mass = m
    this.r = sqrt(this.mass)*10
    // this.vel = p5.Vector.random2D()

  }
  friction(){
    let diff = height - (this.pos.y + this.r)
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
    if (this.pos.y >= height-this.r){
      this.pos.y = height-this.r
      this.vel.y*=-1
    }
    if (this.pos.x >= width-this.r){
      this.pos.x = width-this.r
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
    stroke(255)
    strokeWeight(2)
    fill(255, 100)
    ellipse(this.pos.x, this.pos.y,this.r*2)
  }
}
