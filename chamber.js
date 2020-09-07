const Robot = require("./robot");

class Chamber {
    constructor(simulation) {
        this.simulation = simulation; // reference to the main object
        this.robots = [];
        this.error = null;
    };

    addRobot(xStart, yStart) {
        if (!this.isPositionGood(xStart, yStart)) {
            this.setError('Cannot start new robot at specified position.');
            return null;
        }
        const newRobot = new Robot(this, xStart, yStart);
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
