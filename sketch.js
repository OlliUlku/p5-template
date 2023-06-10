let ZERO = 20;
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

  background(ZERO);

  spotLight(ONE,ONE,ONE,0,0,200,0,0,-1,PI / 16,0);
  spotLight(ONE, ONE, ONE, mouseX - width / 2, mouseY - height / 2, 200, 0, 0, -1, PI / 16, 0);
  //pointLight(ONE, ONE, ONE, 0, 0, 100);


  noStroke();
  //stroke('red');
  //ambientMaterial(ONE,ONE,ONE);
  fill(ONE);
  //rotateX(angleX);rotateY(angleY);
  //rotateY(angleZ);
  rect(0,0,50);
 // ambientMaterial(ZERO,ZERO,ZERO);
  //plane(width/2);
  angleX += 0.1;
  angleY += 0.09;
  angleX += 0.02;
}
