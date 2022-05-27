// let xoff1 = 0
// let xoff2 = 100000
let start = 0

function setup() {
  createCanvas(400, 400)

}
function draw() {
  background(51)

  beginShape()
  let xoff=start

  for (let x = 0; x<width; x++){
    stroke(255)
    noFill()
    let y = noise(xoff)*height
    xoff+=.01
    vertex(x, y)
  }
  endShape()
  start+=.01

   // let x = map(noise(xoff1), 0, 1, 0, width)
  // let y = map(noise(xoff2), 0, 1, 0, width)
  //
  // xoff1 += .01
  // xoff2 += .01
  // ellipse(x, y, 25)
  // noLoop()
}
