let cols, rows
let scl = 20
let terrain = []
let start = 0
function setup() {
  createCanvas(600, 600, WEBGL);
  cols = 900 / scl
  rows = 3000 / scl

}
console.log(terrain)
function draw() {
  start-=.1
  let yoff = 0
  for (let y = 0; y < rows; y++) {
    let xoff = start
    terrain[y]=[]
    for (let x = 0; x < cols; x++) {
      terrain[y][x] = map(noise(xoff,yoff),0,1,-100,100)
      xoff+=0.1
    }
    yoff+=0.1
  }
  background(55)
  stroke(255)
  noFill()
  translate(-width/ 2,-80)
  rotateX(1.3)
  for (let y = 0; y < rows; y++) {
    beginShape(TRIANGLE_STRIP)
    for (let x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y])
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1])

    }
    endShape()
  }
}
