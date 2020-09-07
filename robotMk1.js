const {Robot, directionNames} = require("./robot");

class RobotMk1 extends Robot {
    constructor(chamber, xPosition = 0, yPosition = 0) {
        super(chamber, xPosition, yPosition);
        this.facingDirection = 0; // NB: 0 = up, 1 = right, 2 = down, 3 = left
    };

    move(command) {
        switch(command) {
            case 'F':
                this.scuttle(directionNames.up);
                break;

            case 'R':
                this.scuttle(directionNames.right);
                break;
                
            case 'B':
                this.scuttle(directionNames.down);
                break;

            case 'L':
                this.scuttle(directionNames.left);
                break;
                
            default:
                // ignoring bad movement command
        }
    }
}

module.exports = RobotMk1; 
