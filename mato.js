class mato {
    constructor() {
        this.points = 0;
        this.fullHp = 50;
        this.hp = this.fullHp;
        this.pos = createVector(0, 0, 0);
        this.vel = createVector(0, -1, 0);
        this.size = F;
        this.lastPos = createVector(0, 0, 0);
        this.lastPos.copy(this.pos);
        this.instructions = [this.vel.copy()];
        this.direction = this.vel.copy();
        this.nextPos;
        this.c = color(0, 0, 120);

        this.tail = [createVector(0, 1, 0), createVector(0, 1, 0), createVector(0, 1, 0), createVector(0, 1, 0), createVector(0, 1, 0), createVector(0, 1, 0)];
    }

    light() {
        spotLight(255, 255, 255, this.pos.x, this.pos.y, 1000, 0, 0, -1, 100, 400);
    }

    update() {
        print(this.hp);
        this.hp--;
        if (this.hp <= 0) {
            gameOver();
        }
        if (this.instructions.length > 3) {
            this.instructions.length = 3;
        }

        for (let i = 0; i < 3; i++) {
            this.direction = this.instructions.shift();
            if (this.direction != undefined) {

                let oppositeDir = this.direction.copy();
                oppositeDir.mult(-1);
                oppositeDir.mult(1);

                if (!oppositeDir.equals(this.vel)) {
                    // new direction done and is not going straight back, break from loop
                    this.vel.set(this.direction);
                    break;
                }
            }
        }

        // camerapurposes
        this.lastPos = this.pos.copy();

        //move tail
        this.tail.shift();
        append(this.tail, this.pos.copy());

        this.nextPos = p5.Vector.add(this.pos, this.vel);
        for (let i in this.tail) {
            if (this.nextPos.equals(this.tail[i])) {
            }
        }

        //move head
        this.pos.add(this.vel);

        for (let i in this.tail) {
            if (this.pos.equals(this.tail[i])) {
               gameOver()
            }
        }
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
            emissiveMaterial(this.c);
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
        append(this.instructions, createVector(0, 0, 1));
    }
    TURNDOWN_Z() {
        append(this.instructions, createVector(0, 0, -1));
    }

    tryToEat(omppuPos, omppuIndex) {
        if (this.pos.equals(omppuPos)) {
            //EATING!!
            this.hp = this.fullHp;
            this.points++;
            print('Yum!!! nicely done! Points: ' + this. points);
            for (let i = 0; i < 5; i++) {
                append(this.tail, this.pos.copy());
            }
            Omput[omppuIndex].eaten();
        }
    }
}