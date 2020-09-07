const Simulation = require('./simulation');

const handleError = (errorMsg) => {
    console.error(errorMsg);
    process.exit(1);
};

if (process.argv.length != 3) {
    handleError("ERROR: incorrect params supplied. \nUsage: node assignment.js instruction_string\n");
}

// --

const simulation = new Simulation();
const instructions = process.argv[2];

const finalRobotPosition = simulation.enterInstructions(instructions);

if (simulation.getError()) {
    console.log("ERROR:" + simulation.getError());
} else {
    console.log(`
Final position of robot:
x=${finalRobotPosition.x}, y=${finalRobotPosition.y}
`);
}



