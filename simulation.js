const Chamber = require("./chamber");

class Simulation {
    constructor() {
        this.chamber = new Chamber();
        this.error = null;
    };

    /*
        Main entry point for solution, should return a position in {x:0, y:0} format or null if an error occurs.
    */
    enterInstructions(instructions = "") {

        const segments = instructions.split(",");
        if (segments.length !== 4 || isNaN(segments[0]) || isNaN(segments[1]) || isNaN(segments[2])) {
            this.error = `Incorrect instructions format: should be robot version, x position, y position, movements e.g. "2,0,0,FLFRB".`;
            return null;
        }

        const robot = this.chamber.addRobot(segments[0], segments[1], segments[2]);
        const movements = segments[3].split('');

        movements.map(command => {
            robot.move(command);
        });

        return {x: robot.xPosition, y: robot.yPosition};
    };

    clear() {
        this.chamber = new Chamber();
    };

    getError() {
        return this.error;
    };
}

module.exports = Simulation; 
