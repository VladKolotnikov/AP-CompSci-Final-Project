let movers = []
let mu = 0.1
function setup() {
  createCanvas(400, 400)
  for(let i = 0; i < 8; i++){
    movers[i] = new Mover(random(50, 350), 200,random(1,8))
  }

}
function draw() {
  background(55)
  for (let mover of movers) {
  let gravity = createVector(0,0.1)
  let weight = p5.Vector.mult(gravity, mover.mass)
  let wind = createVector(0.1,0)
  if(mouseIsPressed){
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
