let noise1D = function(p){
  // let xoff1 = 0
  // let xoff2 = 100000
  let start = 0

  p.setup = function(){
    p.createCanvas(400, 400)

  }
  p.draw = function() {
    p.background(0)

    p.beginShape()
    let xoff=start

    for (let x = 0; x<p.width; x++){
      p.stroke(255)
      p.noFill()
      let y = p.noise(xoff)*p.height
      xoff+=.01
      p.vertex(x, y)
    }
    p.endShape()
    start+=.01

     // let x = map(noise(xoff1), 0, 1, 0, width)
    // let y = map(noise(xoff2), 0, 1, 0, width)
    //
    // xoff1 += .01
    // xoff2 += .01
    // ellipse(x, y, 25)
    // noLoop()
  }

}
let noise1 = new p5(noise1D, 'noise1D')

let noise2D = function(p){
  let inc = 0.01
  let start = 0
  p.setup = function() {
    p.createCanvas(400, 400);
    p.pixelDensity(1)

  }

  p.draw =function() {
    let yoff = 0
    p.loadPixels();
    for (let y = 0; y < p.width; y++) {
      let xoff = start
      for (let x = 0; x < p.width; x++) {
        let index = (x + y * p.width) * 4
        let r = p.noise(xoff,yoff)*255
        p.pixels[index + 0] = r
        p.pixels[index + 1] = r
        p.pixels[index + 2] = r
        p.pixels[index + 3] = 255
        xoff += inc
      }
      yoff+= inc
    }
    start+=inc
    p.updatePixels()
  }
}
let noise2 = new p5(noise2D,'noise2D')

let terrain3D = function(p){
  let cols, rows
  let scl = 20
  let terrain = []
  let start = 0
  p.setup=function() {
    p.createCanvas(400, 400, p.WEBGL);
    cols = 900 / scl
    rows = 1000 / scl

  }
  console.log(terrain)
  p.draw = function() {
    start-=.1
    let yoff = 0
    for (let y = 0; y < rows; y++) {
      let xoff = start
      terrain[y]=[]
      for (let x = 0; x < cols; x++) {
        terrain[y][x] = p.map(p.noise(xoff,yoff),0,1,-100,100)
        xoff+=0.1
      }
      yoff+=0.1
    }
    p.background(0)
    p.stroke(255)
    p.fill(100)
    p.translate(-p.width/ 2,0)
    p.rotateX(1.3)
    for (let y = 0; y < rows; y++) {
      p.beginShape(p.TRIANGLE_STRIP)
      for (let x = 0; x < cols; x++) {
        p.vertex(x * scl, y * scl, terrain[x][y])
        p.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1])

      }
      p.endShape()
    }
  }
}
let terrain = new p5(terrain3D,'terrain')
