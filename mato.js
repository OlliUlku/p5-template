class mato {
    constructor() {
        this.pos = createVector(0, 0, 0);
        this.vel = createVector(0, -1, 0);
        this.size = 20;
    }

    update() {
        this.pos.add(this.vel);
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        emissiveMaterial(0, 0, 255);
        box(this.size);
        pop();
    }

    TURNLEFT () {
        this.vel.rotate(-90);
    }

    TURNRIGHT () {
        this.vel.rotate(90);
    }
}