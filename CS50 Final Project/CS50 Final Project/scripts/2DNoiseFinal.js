let inc = 0.01
let start = 0
function setup() {
  createCanvas(200, 200);
  pixelDensity(1)

}

function draw() {
  let yoff = 0
  loadPixels();
  for (let y = 0; y < width; y++) {
    let xoff = start
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4
      let r = noise(xoff,yoff)*255
      pixels[index + 0] = r
      pixels[index + 1] = r
      pixels[index + 2] = r
      pixels[index + 3] = 255
      xoff += inc
    }
    yoff+= inc
  }
  start+=inc
  updatePixels()
}
