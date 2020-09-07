'use strict';

const Simulation = require('../simulation');

const chai = require('chai');
const chaistring = require('chai-string');
chai.use(chaistring);

const should = chai.should();
const assert = chai.assert;

let simulation = null;

describe('Tests for Simulation class', function()  {

  before(() => {
    simulation = new Simulation();
  });
  
  it('parses an instruction correctly',  () => {
    let response = simulation.enterInstruction("0,0,FLFRB");
    response.should.not.equal(null); // NB: don't care where the robot got to for this test, just testing parsing

    should.not.exist(simulation.getError());

    response = simulation.enterInstruction("0,0");
    should.not.exist(response);
    simulation.getError().should.equal(`Incorrect instruction format: should be x position, y position, movements e.g. "0,0,FLFRB".`);

    response = simulation.enterInstruction("TOP,0,FBRL");
    should.not.exist(response);
    simulation.getError().should.equal(`Incorrect instruction format: should be x position, y position, movements e.g. "0,0,FLFRB".`);

    // response = simulation.enterInstruction("0,0,FLRBU");
    // should.not.exist(response);
    // simulation.getError().should.equal(`Incorrect instruction format: movements allowed are "F", "B", "L" and "R"`);
  });

  it('creates a robot correctly',  () => {
    let response = simulation.enterInstruction("0,0,L");
    response.x.should.equal(0);
    response.y.should.equal(0);

    simulation.clear();

    response = simulation.enterInstruction("10,20,L");
    response.x.should.equal(10);
    response.y.should.equal(20);
  });

  it('moves a robot correctly',  () => {
    let response = simulation.enterInstruction("0,0,FFFRFFFLFFFB");
    response.x.should.equal(3);
    response.y.should.equal(5);

    simulation.clear();

    response = simulation.enterInstruction("0,0,BBBLLLFF");
    response.x.should.equal(2);
    response.y.should.equal(0);
  });
});