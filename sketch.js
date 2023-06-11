let ZERO = 25;
let ONE = 220;
let angleX = 0;
let angleY = 0;
let angleZ = 0;

function setup() {
  // CENTERS CANVAS
  let CNVS = createCanvas(400, 400, WEBGL);
  let newWindowX = (windowWidth - width) / 2;
  let newWindowY = (windowHeight - height) / 2;
  CNVS.position(newWindowX, newWindowY);

  frameRate(12);


  rectMode(CENTER);
}

function draw() {
  orbitControl();

  background(0);

  //spotLight(ONE, ONE, ONE, 0, 0, 200, 0, 0, -1, PI / 8, 0);
  spotLight(10, 10, 10, mouseX - width / 2, mouseY - height / 2, 200, 0, 0, -1, PI / 16, 0);
  //pointLight(ONE, ONE, ONE, 0, 0, 100);
  noStroke();

  push();
  emissiveMaterial(ONE, ONE, ONE);
  plane(width);
  pop();
  push()
  translate(0, 0, 10);
  emissiveMaterial(ZERO, ZERO, ZERO);
  plane(20);
  pop();
}
