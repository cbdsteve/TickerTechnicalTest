const directions = [{x:0, y:1}, {x:1, y:0}, {x:0, y:-1}, {x:-1, y:0}];

class Robot {
    constructor(chamber, xPosition = 0, yPosition = 0) {
        this.chamber = chamber; // reference to the chamber this robot appears on
        this.xPosition = parseInt(xPosition);
        this.yPosition = parseInt(yPosition);
        this.facingDirection = 0; // NB: 0 = up, 1 = right, 2 = down, 3 = left
        this.error = null;
    };

    canMove(isForward) {
        const xDelta = (isForward) ? directions[this.facingDirection].x : directions[this.facingDirection].x * -1;
        const yDelta = (isForward) ? directions[this.facingDirection].y : directions[this.facingDirection].y * -1;
        return this.chamber.isPositionGood(this.xPosition + xDelta, this.yPosition + yDelta);
    };

    move(isForward) {
        if (this.canMove(isForward)) {
            const xDelta = (isForward) ? directions[this.facingDirection].x : directions[this.facingDirection].x * -1;
            const yDelta = (isForward) ? directions[this.facingDirection].y : directions[this.facingDirection].y * -1;
    
            this.xPosition += xDelta;
            this.yPosition += yDelta;
        }
    };

    turn(isRight) {
        if (isRight) {
            this.facingDirection = (this.facingDirection + 1) % 4;
        } else {
            this.facingDirection = (this.facingDirection > 0) ? this.facingDirection - 1 : 3;
        }
    };

    setError(errorMsg) {
        this.error = errorMsg;
    }

    getError() {
        return this.error;
    };
}

module.exports = Robot; 
