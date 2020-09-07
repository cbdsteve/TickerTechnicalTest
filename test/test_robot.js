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

  it('calculates canMove correctly',  () => {
    robot = chamber.addRobot(2, 0, 0);

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
});