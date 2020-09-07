'use strict';

const Chamber = require('../chamber');

const chai = require('chai');
const chaistring = require('chai-string');
chai.use(chaistring);

const should = chai.should();
const assert = chai.assert;

let chamber = null;

describe('Tests for Chamber class', function()  {

  before(() => {
    chamber = new Chamber();
  });
  
  it('correctly identifies the chamber boundaries',  () => {
    let response = chamber.isPositionGood(0, 0);
    response.should.equal(true);

    response = chamber.isPositionGood(999, 999);
    response.should.equal(true);

    response = chamber.isPositionGood(0, -1);
    response.should.equal(true);

    response = chamber.isPositionGood(-1, 0);
    response.should.equal(true);

    response = chamber.isPositionGood(0, -1);
    response.should.equal(true);

    response = chamber.isPositionGood(-1, 0);
    response.should.equal(true);

    response = chamber.isPositionGood(0, -1, 2); // boundary detection for Mk2 only
    response.should.equal(false);

    response = chamber.isPositionGood(-1, 0, 2);
    response.should.equal(false);

    should.not.exist(chamber.getError());
  });

  it('correctly handles the successful creation of a robot',  () => {
    let response = chamber.addRobot(1, 0, 0);
    response.should.not.equal(null);

    should.not.exist(chamber.getError());
  });

  it('correctly handles the unsuccessful creation of a robot',  () => {
    let response = chamber.addRobot(2, -1, 0);
    should.not.exist(response);
    chamber.getError().should.equal("Cannot start new robot at specified position.");
  });
});