const {Robot, directions} = require("./robot");

const INITIAL_FUEL = 30;
const MAX_BOOST = 5;

class RobotMk3 extends Robot {
    constructor(chamber, xPosition = 0, yPosition = 0) {
        super(chamber, xPosition, yPosition);
        this.facingDirection = 0;
        this.fuel = INITIAL_FUEL;
        this.version = 3;
    };

    move(command, boost = null) {
        switch(command) {
            case 'F':
                if (boost) {
                    const actualBoost = this.calculateActualBoost(boost);
                    this.boost(this.facingDirection, actualBoost);
                } else {
                    this.scuttle(this.facingDirection);
                }
                break;

            case 'L':
                this.turn(false);
                break;
                
            case 'R':
                this.turn(true);
                break;
                
            default:
                // NB: Mk3 apparently can't go backwards: "need to turn it around and go in the direction we're facing if we need to head back the way we came"
                // ignoring bad movement command
        }
    };

    /* limits the boost to the remaining fuel or the maximum allowed */
    calculateActualBoost(boost) {
        let actualBoost = (this.fuel < boost) ? this.fuel : boost;
        actualBoost = Math.min(actualBoost, MAX_BOOST);

        this.fuel -= actualBoost;
        return actualBoost;
    };
    
    boost(direction, distance) {
        const xDelta = (directions[direction].x) * distance;
        const yDelta = (directions[direction].y) * distance;

        this.xPosition += xDelta;
        this.yPosition += yDelta;
    }    

    turn(isRight) {
        if (isRight) {
            this.facingDirection = (this.facingDirection + 1) % 4;
        } else {
            this.facingDirection = (this.facingDirection > 0) ? this.facingDirection - 1 : 3;
        }
    };
}

module.exports = RobotMk3; 
