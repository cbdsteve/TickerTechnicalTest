const RobotMk1 = require("./robotMk1");
const RobotMk2 = require("./robotMk2");
const RobotMk3 = require("./robotMk3");

class Chamber {
    constructor(simulation) {
        this.simulation = simulation; // reference to the main object
        this.robots = [];
        this.error = null;
    };

    addRobot(version, xStart, yStart) {
        if (!this.isPositionGood(xStart, yStart, version)) {
            this.setError('Cannot start new robot at specified position.');
            return null;
        }

        let newRobot = null;
        switch(parseInt(version)) {
            case 1:
                newRobot = new RobotMk1(this, xStart, yStart);
                break;
            case 2:
                newRobot = new RobotMk2(this, xStart, yStart);
                break;
            default:
                newRobot = new RobotMk3(this, xStart, yStart);
        }
        this.robots.push(newRobot);
        return newRobot;
    };
    
    isPositionGood(xPosition, yPosition, robotVersion = null) {
        if ((robotVersion === 2) && (xPosition < 0 || yPosition < 0)) {
            // boundary detection applies only to Mk2
            return false;
        }
        return true;
    };

    setError(errorMsg) {
        this.error = errorMsg;
    }

    getError() {
        return this.error;
    };    
}

module.exports = Chamber; 
