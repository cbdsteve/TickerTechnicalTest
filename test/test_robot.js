'use strict';

const Chamber = require('../chamber'); // robots created only through chamber.addRobot

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
    robot = chamber.addRobot(0, 0);
  });
  
  it('calculates turn correctly',  () => {
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
    let response = robot.canMove(true);
    response.should.equal(true);

    response = robot.canMove(false); 
    response.should.equal(false); // robot starts at 0,0 facing north / up so should not be able to reverse immediately

    robot.turn(false); // should now be facing west / left, so canMove responses should be flipped

    response = robot.canMove(true);
    response.should.equal(false);

    response = robot.canMove(false); 
    response.should.equal(true);

    should.not.exist(robot.getError());
  });

  it('calculates move correctly',  () => {
    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(0);
    robot.facingDirection.should.equal(0);

    robot.move(true);
    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(1);

    robot.move(false);
    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(0);

    robot.turn(true);
    robot.move(true);
    robot.xPosition.should.equal(1);
    robot.yPosition.should.equal(0);

    robot.move(false);
    robot.xPosition.should.equal(0);
    robot.yPosition.should.equal(0);

    should.not.exist(robot.getError());
  });

});