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
        const commands = segments[3];

        for (let commandIndex = 0; commandIndex < commands.length; commandIndex++) {
            let boost = null;

            if (!isNaN(commands.charAt(commandIndex)) && commandIndex + 1 < commands.length) {
                boost = commands.charAt(commandIndex);
                commandIndex++;
            }

            const direction = commands.charAt(commandIndex);
            robot.move(direction, boost); // boost ignored by non-Mk3
        }

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

/*
FFFFFFFF  0, 8

RRRR RRR left


FFFF -4, 8

LLL up

BB -4, 8

RRRRR right

LLLL LLLL L up 

R right

FFF -3, 8

3,3,6,

FFFFFFFF 3,14
RRRR RRR left
FFFF -1, 14
LLL up
BB 
RRRRR right
LLLL LLLL L up
R right
FFF 2,14

*/