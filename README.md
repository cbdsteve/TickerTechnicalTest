# TicketTechincalTest
My solution to the tech test set by ticker.co.uk

# Usage

Usage: node assignment.js instruction_string

e.g.: node assignment.js "0,7,RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR"

# Tests

You can run the unit tests like so:

npm test

# Notes

NB: There is some inconsistency in the wording of the challenge, around the way the robots move:
    It says "the robot can move forwards, backwards and side to side"; I would understand 'side to side' to mean
    taking a step to the left or a step to the right, but that would conflict with the idea of moving 'forward' or
    'backwards', so I'm going to assume that 'left' and 'right' in this case means the robot should turn.
    This also means the robot will have a starting direction as well as starting position, which I am assuming
    for now to be up.


