let ZERO = 0;
let ONE = 255;
let angleX = 0;
let angleY = 0;
let angleZ = 0;
let Madot = [];
let Boxes = [];

function setup() {
  // CENTERS CANVAS
  let CNVS = createCanvas(windowWidth, windowHeight, WEBGL);
  let newWindowX = (windowWidth - width) / 2;
  let newWindowY = (windowHeight - height) / 2;
  CNVS.position(newWindowX, newWindowY);
  // frameRate(12);
  rectMode(CENTER);
  angleMode(DEGREES);


  for (let i = 0; i < 100; i++) {
    Boxes[i] = new Box();
  }

  for (let i = 0; i < 1; i++) {
    Madot[i] = new mato();
  }
}

function draw() {
  // ortho()
  orbitControl();



  background(0);

  for (i in Boxes) {
    Boxes[i].light();
  }

  // spotLight(ONE, ONE, ONE, 0, 0, 200, 0, 0, -1, PI / 8, 0);
  // pointLight(ONE, ONE, ONE, 0, 0, 100);
  noStroke();

  push();
  specularMaterial(ZERO);
  translate(0, 0, -1);
  plane(width);
  pop();

  for (i in Boxes) {
    Boxes[i].update();
    Boxes[i].show();
  }
  for (i in Madot) {
    Madot[i].update();
    Madot[i].show();
  }
  push();
  shininess(10000);
  specularMaterial(ONE);
  translate(0, 0, frameCount / 10 + 10);
  rotateX(frameCount / 2);
  rotateY(frameCount / 3);
  rotateZ(frameCount / 5);
  box(10);
  pop();

  // pop();
  // push();
  // translate(0, 0, 0);
  // emissiveMaterial(ZERO, ZERO, ZERO);
  // box(20);
  // pop();

   angleMode(RADIANS)
   camera(Madot[0].pos.x, Madot[0].pos.y, (height/2) / tan(PI/6), Madot[0].pos.x, Madot[0].pos.y, 0, 0, 1, 0)
   angleMode(DEGREES);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    Madot[0].TURNLEFT();
  }
  if (keyCode === RIGHT_ARROW) {
    Madot[0].TURNRIGHT();
  }
}

class Box {
  constructor() {
    this.pos = createVector(0, 0, random(5));
    this.vel = createVector(1, 0, 0);
    this.vel.rotate(random(360));
    this.size = 20;
    this.c = color(random(255), random(255), random(255));
    // this.c = color(ONE);
    // this.lightc = color(random(255), random(255), random(255));
    // print(this.c.toString())
  }

  update() {
    let rSize = 2;
    this.vel.rotate(random(-20, 20));
    this.pos.add(this.vel);
  }

  light() {
    spotLight(this.c, this.pos.x, this.pos.y, 1000, 0, 0, -1, 100, 400);
  }

  show() {
    push();
    specularMaterial(this.c);
    translate(this.pos.x, this.pos.y, this.pos.z);
    plane(20, 20, 20);
    pop();

  }
}
