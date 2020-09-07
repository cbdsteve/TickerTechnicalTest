# TicketTechincalTest
My solution to the tech test set by ticker.co.uk

# Usage

Usage: node assignment.js instruction_string

e.g.: node assignment.js "1,0,7,RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR"

Where the 4 segments indicate:

1) the model of the robot to use (1 for Mk1, anything else for Mk2)
2) the starting X position for the robot
3) the starting Y position for the robot
4) the commands for the robot to execute

# Tests

You can run the unit tests like so:

npm test

# Notes

My assumptions for the Mk1 proved incorrect (it was supposed to scuttle left and right rather than turn), but I've refactored the code to support both types now. I'm leaving in the boundary detection for the Mk1 (so a robot starting at 0,0 cannot go backwards or left).


