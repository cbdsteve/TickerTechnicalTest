const {Robot} = require("./robot");

class RobotMk1 extends Robot {
    constructor(chamber, xPosition = 0, yPosition = 0) {
        super(chamber, xPosition, yPosition);
        this.facingDirection = 0; // NB: 0 = up, 1 = right, 2 = down, 3 = left
    };

    move(command) {
        switch(command) {
            case 'F':
                this.scuttle(0);
                break;

            case 'R':
                this.scuttle(1);
                break;
                
            case 'B':
                this.scuttle(2);
                break;

            case 'L':
                this.scuttle(3);
                break;
                
            default:
                // ignoring bad movement command
        }
    }
}

module.exports = RobotMk1; 
