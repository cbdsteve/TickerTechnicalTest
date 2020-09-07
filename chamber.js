const RobotMk1 = require("./robotMk1");
const RobotMk2 = require("./robotMk2");

class Chamber {
    constructor(simulation) {
        this.simulation = simulation; // reference to the main object
        this.robots = [];
        this.error = null;
    };

    addRobot(version, xStart, yStart) {
        if (!this.isPositionGood(xStart, yStart)) {
            this.setError('Cannot start new robot at specified position.');
            return null;
        }

        const newRobot = (parseInt(version) === 1) ? new RobotMk1(this, xStart, yStart) : new RobotMk2(this, xStart, yStart);
        this.robots.push(newRobot);
        return newRobot;
    };
    
    isPositionGood(xPosition, yPosition) {
        if (xPosition < 0 || yPosition < 0) {
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
