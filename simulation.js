const Chamber = require("./chamber");

class Simulation {
    constructor() {
        this.chamber = new Chamber();
        this.error = null;
    };

    /*
        Main entry point for solution, should return a position in {x:0, y:0} format or null if an error occurs.
    */
    enterInstruction(instruction = "") {

        /*
            NB: There is some inconsistency in the wording of the challenge, around the way the robots move:
                It says "the robot can move forwards, backwards and side to side"; I would understand 'side to side' to mean
                taking a step to the left or a step to the right, but that would conflict with the idea of moving 'forward' or
                'backwards', so I'm going to assume that 'left' and 'right' in this case means the robot should turn.
                This also means the robot will have a starting direction as well as starting position, which I am assuming
                for now to be up.

        */

        const segments = instruction.split(",");
        if (segments.length !== 3 || isNaN(segments[0]) || isNaN(segments[1])) {
            this.error = `Incorrect instruction format: should be x position, y position, movements e.g. "0,0,FLFRB".`;
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
