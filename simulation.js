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
        if (segments.length !== 3 || isNaN(segments[0]) || isNaN(segments[1])) {
            this.error = `Incorrect instructions format: should be x position, y position, movements e.g. "0,0,FLFRB".`;
            return null;
        }

        const robot = this.chamber.addRobot(segments[0], segments[1]);
        const movements = segments[2].split('');

        movements.map(command => {

            switch(command) {
                case 'F':
                    robot.move(true);
                    break;

                case 'B':
                    robot.move(false);
                    break;

                case 'L':
                    robot.turn(false);
                    break;
                    
                case 'R':
                    robot.turn(true);
                    break;
                    
                default:
                    // ignoring bad movement command
            }
        });

        const finalPosition = {x: robot.xPosition, y: robot.yPosition};

        return finalPosition;
    };

    clear() {
        this.chamber = new Chamber();
    };

    getError() {
        return this.error;
    };
}

module.exports = Simulation; 
