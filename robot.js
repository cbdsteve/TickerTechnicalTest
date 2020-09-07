const directions = [{x:0, y:1}, {x:1, y:0}, {x:0, y:-1}, {x:-1, y:0}];
const directionNames = { up:0, right:1, down:2, left:3 };

class Robot {
    constructor(chamber, xPosition = 0, yPosition = 0) {
        this.chamber = chamber; // reference to the chamber this robot appears on
        this.xPosition = parseInt(xPosition);
        this.yPosition = parseInt(yPosition);
        this.facingDirection = 0; // NB: 0 = up, 1 = right, 2 = down, 3 = left
        this.error = null;
        this.version = 0;
    };

    /* Handle move command, implementation depends on robot version */
    move() {
        console.error("Virtual function (sort of), needs to be implemented in subclass");
    };

    scuttle(direction) {
        if (this.canMove(direction)) {
            const xDelta = directions[direction].x;
            const yDelta = directions[direction].y;
    
            this.xPosition += xDelta;
            this.yPosition += yDelta;
        }
    }

    canMove(direction) {
        const xDelta = directions[direction].x;
        const yDelta = directions[direction].y;
        return this.chamber.isPositionGood(this.xPosition + xDelta, this.yPosition + yDelta, this.getVersion());
    };

    getVersion() {
        return this.version;
    }

    getError() {
        return this.error;
    };
}

module.exports = {Robot, directions, directionNames}; 
