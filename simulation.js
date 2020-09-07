const Chamber = require("./chamber");

class Simulation {
    constructor() {
        this.chamber = new Chamber();
        this.error = null;
    };

    enterInstruction(instruction = "") {

        /*
            NB: There is some inconsistency in the wording of the challenge, around the way the robots move:
                It says "the robot can move forwards, backwards and side to side"; I would understand 'side to side' to mean
                taking a step to the left or a step to the right, but that would conflict with the idea of moving 'forward' or
                'backwards', so I'm going to assume that 'left' and 'right' in this case means the robot should turn.
                This also means the robot will have a starting direction as well as starting position, which I am assuming
                for now to be up.

        */

        this.error = "Stubbed";
        return false;
    };

    setError(errorMsg) {
        this.error = errorMsg;
    }

    getError() {
        return this.error;
    };
}

module.exports = Simulation; 
