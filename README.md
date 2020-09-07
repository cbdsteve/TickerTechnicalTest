# TicketTechincalTest
My solution to the tech test set by ticker.co.uk

# Usage

Usage: node assignment.js instruction_string

e.g.: node assignment.js "1,0,7,RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR"

Where the 4 segments indicate:

1) the model of the robot to use (1 for Mk1, 2 for Mk2, anything else for Mk3)
2) the starting X position for the robot
3) the starting Y position for the robot
4) the commands for the robot to execute

# Tests

You can run the unit tests like so:

npm test

# Notes

Fuel for the boost is limited to 30, also the maximum boost is limited to 5, both of these conditions will not throw an error, just limit the amount of boost (when out of fuel, any attempt to boost results in zero movement).
