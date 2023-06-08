let jpegPhoto, CNVS;

function setup() {
  // CENTERS CANVAS
  CNVS = createCanvas(300, 128);
  // let newWindowX = (windowWidth - width) / 2;
  // let newWindowY = (windowHeight - height) / 2;
  // CNVS.position(newWindowX, newWindowY);
  pixelDensity(1);
  noLoop();
}

function draw() {
  background(255);
  fill(0);
  noStroke();
  circle(55, height / 2, random(30, 100));
  circle(155, height / 2, random(30, 100));
  let canvas = document.getElementById("defaultCanvas0");
  jpegPhoto = canvas.toDataURL('image/jpeg');
  print(jpegPhoto);

  createImg(jpegPhoto, 'photo of the canvas');
}