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
let highScore;
let _area = 1500;


function setup() {
  // CENTERS CANVAS
  let CNVS = createCanvas(windowWidth, windowHeight, WEBGL);
  let newWindowX = (windowWidth - width) / 2;
  let newWindowY = (windowHeight - height) / 2;
  CNVS.position(newWindowX, newWindowY);
  frameRate(60);
  //rectMode(CENTER);
  angleMode(DEGREES);

  // CONTROLLERS
  addConnection();
  for (let i = 0; i < 1; i++) {
    ohjaimet[i] = new Controller_8BitDoZero2(i);
  }



  for (let i = 0; i < 100; i++) {
    Boxes[i] = new Box();
  }

  for (let i = 0; i < 1; i++) {
    Madot[i] = new mato();
  }

  for (let i = 0; i < 1; i++) {
    Omput[i] = new omena();
  }
  highScore = getItem('highScore');
  if (highScore === null) {
    highScore = 0;
  }
  print('Game start!');
  print('Current local highscore: ' + highScore);

}

function draw() {

  controllerUsed(); //checks all buttons and updates values

  //ortho();
  //orbitControl();



  background(0);

  for (let i = 0; i < 3; i++) {
    Boxes[i].light();
  }

  for (let i in Madot) {
    Madot[i].light();
  }

  //spotLight(ONE, ONE, ONE, 0, 0, 200, 0, 0, -1, PI / 8, 800);
  // pointLight(ONE, ONE, ONE, 0, 0, 100);
  noStroke();

  push();
  specularMaterial(ZERO);
  translate(0, 0, -Madot[0].size - 1);
  plane(width);
  pop();

  push();
  translate(0, 0, -Madot[0].size);
  for (let i in Boxes) {
    Boxes[i].update();
    Boxes[i].show();
  }
  pop();

  for (let i in Omput) {
    Omput[i].show();
    // if (frameCount % 22 === 0) {
    //   Omput[i].update();
    // }
  }

  for (let i in ohjaimet) {
    controlScheme(i);
  }

  for (let i in Madot) {
    Madot[i].show();

    if (frameCount % 30 === 0) {
      Madot[i].update();

      for (let k in Omput) {
        Madot[i].tryToEat(Omput[k].pos, k);
      }
      frames = 0;
    }


  }

  // RotatingBox
  // push();
  // shininess(10000);
  // emissiveMaterial(ONE);
  // translate(0, 0, frameCount / 10 + 10);
  // rotateX(frameCount / 2);
  // rotateY(frameCount / 3);
  // rotateZ(frameCount / 5);
  // box(10);
  // pop();

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

  grid3d();

  //CAMERA
  angleMode(RADIANS);

  let siniX = map(sin(frameCount / 100), -1, 1, 50, 400);
  let siniY = map(sin(frameCount / 100), -1, 1, 300, 400);

  camera(camX + siniX, camY + siniY, (height / 2) / tan(PI / 6), camX, camY, 0, 1, 1, 0);
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
    // if (isLooping) {
    //   noLoop();
    // }
    // else {

    for (let i in Omput) {
      Omput[i].newPos();
    }

    // }
  }
}

function gameOver() {
  noLoop();
  print('Game OVER!!! Points ' + Madot[0].points + ', current local highscore: ' + highScore);
  if (Madot[0].points > highScore) {
    print('NEW LOCAL HIGHSCORE!!!!!!!! ' + Madot[0].points + ' POINTS!!!!!');
    storeItem('highScore', Madot[0].points);
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
    if (this.pos.x > _area || this.pos.x < -(_area)) {
      this.pos.x *= -1;
    }
    if (this.pos.y > _area || this.pos.y < -(_area)) {
      this.pos.y *= -1;
    }
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

function grid3d() {
  push();
  noFill();
  stroke(0, 150, 0);
  strokeWeight(1);
  let gRadX = Omput[0].radius * 2;
  let gRadY = Omput[0].radius * 2;
  let gRadZ = Omput[0].radius * 2;

  translate(-(gRadX*F/2),-(gRadY*F/2),0)
  translate(-(F/2),-(F/2),-(F/2))
  let division = 10

  for (let x = 0; x <= gRadX; x += division) {
    for (let y = 0; y <= gRadY; y += division) {
      for (let z = 0; z <= gRadY; z += division) {
      line(x * F, y * F, z * F, gRadX * F - x * F, y * F, z*F);
      line(x * F, y * F, z * F, x * F, gRadY * F - y * F, z*F);
      line(x * F, y * F, z * F, x * F, y * F, gRadZ * F - z*F);

      }
    }
  }

  pop();
}

