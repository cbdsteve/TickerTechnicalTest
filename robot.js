const directions = [{x:0, y:1}, {x:1, y:0}, {x:0, y:-1}, {x:-1, y:0}];

class Robot {
    constructor(map, xPosition = 0, yPosition = 0) {
        this.map = map; // reference to the map this robot appears on
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.facingDirection = 0; // NB: 0 = up, 1 = right, 2 = down, 3 = left
        this.error = null;
    };

    canMove(isForward) {
        this.error = "Stubbed";
        return false;
    };

    move(isForward) {
        this.error = "Stubbed";
        return false;
    };

    turn(isRight) {
        this.error = "Stubbed";
        return false;
    };

    setError(errorMsg) {
        this.error = errorMsg;
    }

    getError() {
        return this.error;
    };
}

module.exports = Robot; 
