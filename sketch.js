let ZERO = 0;
let ONE = 255;
let angleX = 0;
let angleY = 0;
let angleZ = 0;
let Madot = [];
let Boxes = [];
let F = 20;
let frames = 0;
let Omput = [];


function setup() {
  // CENTERS CANVAS
  let CNVS = createCanvas(windowWidth, windowHeight, WEBGL);
  let newWindowX = (windowWidth - width) / 2;
  let newWindowY = (windowHeight - height) / 2;
  CNVS.position(newWindowX, newWindowY);
  frameRate(60);
  //rectMode(CENTER);
  angleMode(DEGREES);




  for (let i = 0; i < 100; i++) {
    Boxes[i] = new Box();
  }

  for (let i = 0; i < 1; i++) {
    Madot[i] = new mato();
  }

  for (let i = 0; i < 5; i++) {
    Omput[i] = new omena();
  }
}

function draw() {
  //ortho();
  //orbitControl();



  background(0);

  for (i in Boxes) {
    Boxes[i].light();
  }

  spotLight(ONE, ONE, ONE, 0, 0, 200, 0, 0, -1, PI / 8, 0);
  // pointLight(ONE, ONE, ONE, 0, 0, 100);
  noStroke();

  push();
  specularMaterial(ZERO);
  translate(0, 0, -Madot[0].size - 1);
  plane(width);
  pop();

  push();
  translate(0, 0, -Madot[0].size);
  for (i in Boxes) {
    Boxes[i].update();
    Boxes[i].show();
  }
  pop();

  for (i in Omput) {
    Omput[i].show();
    // if (frameCount % 22 === 0) {
    //   Omput[i].update();
    // }
  }

  for (i in Madot) {
    Madot[i].show();

    if (frameCount % 30 === 0) {
      Madot[i].update();
      frames = 0;
    }
  }

  // RotatingBox
  push();
  shininess(10000);
  emissiveMaterial(ONE);
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

  let lerpV = map(frames, 0, 29, 0, 1);
  let lerpX = lerp(Madot[0].lastPos.x * F, Madot[0].pos.x * F, lerpV);
  let lerpY = lerp(Madot[0].lastPos.y * F, Madot[0].pos.y * F, lerpV);
  let camX = lerpX;
  let camY = lerpY;
  frames++;
  if (frames >= 60) {
    frames = 0;
  }
  angleMode(RADIANS);

  camera(camX + 400, camY + 400, (height / 2) / tan(PI / 6), camX, camY, 0, 1, 1, 0);
  angleMode(DEGREES);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    Madot[0].TURNLEFT();
  }
  else if (keyCode === RIGHT_ARROW) {
    Madot[0].TURNRIGHT();
  }
  else if (keyCode === UP_ARROW) {
    Madot[0].TURNUP_Y();
  }
  else if (keyCode === DOWN_ARROW) {
    Madot[0].TURNDOWN_Y();
  }
  else if (keyCode === 83) {
    Madot[0].TURNDOWN_Z();
  }
  else if (keyCode === 87) {
    Madot[0].TURNUP_Z();
  }
  else if (keyCode === RETURN) {
    for (i in Omput) {
      Omput[i].newPos();
    }
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

class omena {
  constructor() {
    this.newPos();
    print(this.pos);
    this.size = F;
  }


  newPos() {
    this.pos = createVector((round(random(-10, 10))), (round(random(-10, 10))), (round(random(0, 20))));
  }

  update() {
    this.newPos();
  }

  show() {
    push();
    translate(this.pos.x * F, this.pos.y * F, this.pos.z * F);
    emissiveMaterial(255, 0, 255);
    box(this.size);
    pop();
  }



}
