'use strict';

const Chamber = require('../chamber'); // robots created only through chamber.addRobot
const {directionNames} = require('../robot');

const chai = require('chai');
const chaistring = require('chai-string');
chai.use(chaistring);

const should = chai.should();
const assert = chai.assert;

let chamber = null;
let robot = null;

describe('Tests for Robot class', function()  {

  beforeEach(() => {
    chamber = new Chamber();
  });
  
  it('calculates turn correctly for Mk2',  () => {
    robot = chamber.addRobot(2, 0, 0);
    robot.facingDirection.should.equal(0);

    robot.turn(true);
    robot.facingDirection.should.equal(1);

    robot.turn(false);
    robot.turn(false);
    robot.facingDirection.should.equal(3);

    robot.turn(true);
    robot.turn(true);
    robot.turn(true);
    robot.turn(true);
    robot.turn(true);
    robot.facingDirection.should.equal(0);

    should.not.exist(robot.getError());
  });

  it('calculates canMove correctly for a Mk2',  () => {
    robot = chamber.addRobot(2, 0, 0);
    robot.getVersion().should.equal(2);
    
    let response = robot.canMove(directionNames.up);
    response.should.equal(true);

    response = robot.canMove(directionNames.down); 
    response.should.equal(false);

    response = robot.canMove(directionNames.left);
    response.should.equal(false);

    response = robot.canMove(directionNames.right); 
    response.should.equal(true);

    should.not.exist(robot.getError());
  });

  it('calculates canMove correctly for a Mk3',  () => {
    robot = chamber.addRobot(3, 0, 0);

    let response = robot.canMove(directionNames.up);
    response.should.equal(true);

    response = robot.canMove(directionNames.down); 
    response.should.equal(true);

    response = robot.canMove(directionNames.left);
    response.should.equal(true);

    response = robot.canMove(directionNames.right); 
    response.should.equal(true);

    should.not.exist(robot.getError());
  });

  it('calculates move correctly for a Mk1',  () => {
    robot = chamber.addRobot(1, 0, 0);

    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(0);
    robot.facingDirection.should.equal(0);

    robot.move("F");
    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(1);

    robot.move("B");
    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(0);  // B should be ignored for Mk2 as per instructions

    robot.move("R");
    robot.xPosition.should.equal(1);
    robot.yPosition.should.equal(0);

    robot.move("L");
    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(0);

    robot.move("L");
    robot.move("B");
    robot.xPosition.should.equal(-1);  
    robot.yPosition.should.equal(-1);

    should.not.exist(robot.getError());
  });

  it('calculates move correctly for a Mk2',  () => {
    robot = chamber.addRobot(2, 0, 0);

    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(0);
    robot.facingDirection.should.equal(0);

    robot.move("F");
    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(1);

    robot.move("B");
    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(1);  // B should be ignored for Mk2 as per instructions

    robot.move("R");
    robot.move("F");
    robot.xPosition.should.equal(1);
    robot.yPosition.should.equal(1);

    robot.move("L");
    robot.move("L");
    robot.move("F");
    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(1);

    should.not.exist(robot.getError());
  });


  it('boost command to Mk1 is ignored',  () => {
    robot = chamber.addRobot(1, 0, 0);

    robot.move("F", 5);
    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(1);

    should.not.exist(robot.getError());
  });

  it('calculates move correctly for a Mk3',  () => {
    robot = chamber.addRobot(2, 0, 0);

    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(0);
    robot.facingDirection.should.equal(0);

    robot.move("F");
    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(1);

    robot.move("B");
    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(1);  // B should be ignored for Mk2 as per instructions

    robot.move("R");
    robot.move("F");
    robot.xPosition.should.equal(1);
    robot.yPosition.should.equal(1);

    robot.move("L");
    robot.move("L");
    robot.move("F");
    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(1);

    should.not.exist(robot.getError());
  });

  it('calculates actualBoost correctly',  () => {
    robot = chamber.addRobot(3, 0, 0);

    robot.move("F", 6);
    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(5);
    robot.fuel.should.equal(25);

    robot.move("R", 5); // NB: boost should be ignored for L and R
    robot.move("F", 5);
    robot.xPosition.should.equal(5);
    robot.yPosition.should.equal(5);
    robot.fuel.should.equal(20);

    robot.move("R");
    robot.move("F", 3);
    robot.xPosition.should.equal(5);
    robot.yPosition.should.equal(2);
    robot.fuel.should.equal(17);

    robot.move("F", 5);
    robot.move("F", 5);
    robot.move("F", 5);
    robot.xPosition.should.equal(5);
    robot.yPosition.should.equal(-13);
    robot.fuel.should.equal(2);

    robot.move("R");
    robot.move("F", 5);
    robot.xPosition.should.equal(3); // only 2 fuel left, should not move 5
    robot.yPosition.should.equal(-13);
    robot.fuel.should.equal(0);

    robot.move("F", 5);
    robot.xPosition.should.equal(3); // no movement, out of fuel
    robot.yPosition.should.equal(-13);
    robot.fuel.should.equal(0);

    should.not.exist(robot.getError());
  });    
});