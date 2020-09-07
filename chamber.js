class Chamber {
    constructor(simulation) {
        this.simulation = simulation; // reference to the main object
        this.robots = [];
        this.error = null;
    };

    addRobot(xStart, yStart) {
        if (!this.isPositionGood(xStart, yStart)) {
            this.setError(`Cannot start new robot at x:${xStart}, y:${yStart}`);
            return null;
        }
        const newRobot = new Robot(this, xStart, yStart);
        this.robots.push(newRobot);
        return newRobot;
    };
    
    isPositionGood(xPosition, yPosition) {
        return false;
    };

    setError(errorMsg) {
        this.error = errorMsg;
    }

    getError() {
        return this.error;
    };    
}

module.exports = Chamber; 
