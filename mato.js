class mato {
    constructor() {
        this.pos = createVector(0, 0, 0);
        this.vel = createVector(0, -1, 0);
        this.size = F;
        this.lastPos = createVector(0, 0, 0);
        this.lastPos.copy(this.pos);
        this.instructions = [this.vel.copy()];
        this.direction = this.vel.copy();

        this.tail = [createVector(0, 1, 0), createVector(0, 1, 0), createVector(0, 1, 0), createVector(0, 1, 0), createVector(0, 1, 0), createVector(0, 1, 0)];
        print(this.tail);
    }

    update() {
        if (this.instructions.length > 3) {
            this.instructions.length = 3;
        }

        this.direction = this.instructions.shift();

        if (this.direction != undefined) {
            this.vel.set(this.direction);
        }

        // if (this.vel.x != 1) {
        //     this.vel.set(-1, 0, 0);
        // }
        // if (this.vel.x != -1) {
        //     this.vel.set(1, 0, 0);
        // }
        // if (this.vel.y != 1) {
        //     this.vel.set(0, -1, 0);
        // }
        // if (this.vel.y != -1) {
        //     this.vel.set(0, 1, 0);
        // }




        this.lastPos = this.pos.copy();

        this.tail.shift();
        append(this.tail, this.pos.copy());

        this.pos.add(this.vel);


    }


    show() {
        push();
        translate(this.pos.x * F, this.pos.y * F, this.pos.z * F);
        emissiveMaterial(0, 0, 255);
        box(this.size);
        pop();
        for (let k = 0; k < this.tail.length; k++) {
            push();
            let position = this.tail[k].copy();
            translate(position.x * F, position.y * F, position.z * F);
            emissiveMaterial(0, 0, 120);
            box(this.size);
            pop();
        }
    }

    TURNLEFT() {
        append(this.instructions, createVector(-1, 0, 0));
    }
    TURNRIGHT() {
        append(this.instructions, createVector(1, 0, 0));
    }
    TURNUP_Y() {
        append(this.instructions, createVector(0, -1, 0));
    }
    TURNDOWN_Y() {
        append(this.instructions, createVector(0, 1, 0));
    }
    TURNUP_Z() {
        print('w');
        append(this.instructions, createVector(0, 0, 1));
    }
    TURNDOWN_Z() {
        print('s');
        append(this.instructions, createVector(0, 0, -1));
    }
}