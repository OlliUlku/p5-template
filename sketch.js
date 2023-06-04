function setup() {
  // CENTERS CANVAS
  let CNVS = createCanvas(400, 400);
  let newWindowX = (windowWidth - width) / 2;
  let newWindowY = (windowHeight - height) / 2;
  CNVS.position(newWindowX, newWindowY);
}

function draw() {
  background(220);
}
