class omena {
  constructor() {
    this.radius = 5;
    this.size = F;
    this.newPos();
  }


  newPos() {
    this.pos = createVector((round(random(-this.radius, this.radius))), (round(random(-this.radius, this.radius))), (round(random(0, this.radius * 2))));
    if (this.pos.equals(Madot[0].pos)) {
      print('spawned Omena on head');
      this.newPos()
    }
    for (let i = 0; i < Madot[0].tail.length; i++) {
      if (this.pos.equals(Madot[0].tail[i])) {
        print('spawned Omena on tail!');
        this.newPos()
      }
    }
  }

  eaten() {
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
