const {Robot} = require("./robot");

class RobotMk2 extends Robot {
    constructor(chamber, xPosition = 0, yPosition = 0) {
        super(chamber, xPosition, yPosition);
        this.facingDirection = 0;
        this.version = 2;
    };

    move(command) {
        switch(command) {
            case 'F':
                this.scuttle(this.facingDirection);
                break;

            case 'L':
                this.turn(false);
                break;
                
            case 'R':
                this.turn(true);
                break;
                
            default:
                // NB: Mk2 apparently can't go backwards: "need to turn it around and go in the direction we're facing if we need to head back the way we came"
                // ignoring bad movement command
        }
    }

    turn(isRight) {
        if (isRight) {
            this.facingDirection = (this.facingDirection + 1) % 4;
        } else {
            this.facingDirection = (this.facingDirection > 0) ? this.facingDirection - 1 : 3;
        }
    };
}

module.exports = RobotMk2; 
