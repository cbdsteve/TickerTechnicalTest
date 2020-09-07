const Simulation = require('./simulation');

const handleError = (errorMsg) => {
    console.error("ERROR: " + errorMsg);
    process.exit(1);
};

if (process.argv.length != 3) {
    handleError("incorrect params supplied. \nUsage: node assignment.js instruction_string\n");
}

// --

const simulation = new Simulation();
const instructions = process.argv[2];

const finalRobotPosition = simulation.enterInstructions(instructions);

if (simulation.getError()) {
    handleError(simulation.getError());
}

console.log(`
Final position of robot:
x=${finalRobotPosition.x}, y=${finalRobotPosition.y}
`);



