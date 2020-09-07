'use strict';

const Simulation = require('../simulation');

const chai = require('chai');
const chaistring = require('chai-string');
chai.use(chaistring);

const should = chai.should();
const assert = chai.assert;

let simulation = null;

describe('Tests for Simulation class', function()  {

  beforeEach(() => {
    simulation = new Simulation();
  });
  
  it('parses instructions correctly',  () => {
    let response = simulation.enterInstructions("2,0,0,FLFRB");
    response.should.not.equal(null); // NB: don't care where the robot got to for this test, just testing parsing

    should.not.exist(simulation.getError());

    response = simulation.enterInstructions("0,0");
    should.not.exist(response);
    simulation.getError().should.equal(`Incorrect instructions format: should be robot version, x position, y position, movements e.g. "2,0,0,FLFRB".`);

    response = simulation.enterInstructions("2, TOP,0,FBRL");
    should.not.exist(response);
    simulation.getError().should.equal(`Incorrect instructions format: should be robot version, x position, y position, movements e.g. "2,0,0,FLFRB".`);
  });

  it('creates a robot correctly',  () => {
    let response = simulation.enterInstructions("2,0,0,L");
    response.x.should.equal(0);
    response.y.should.equal(0);

    simulation.clear();

    response = simulation.enterInstructions("2,10,20,L");
    response.x.should.equal(10);
    response.y.should.equal(20);
  });

  it('moves a Mk1 robot correctly',  () => {
    let response = simulation.enterInstructions("1,0,0,FFFRFFFLFFFB");
    should.not.exist(simulation.getError());

    response.x.should.equal(0);
    response.y.should.equal(8);

    simulation.clear();

    response = simulation.enterInstructions("1,0,0,BBBLLLFFRRRRLRBFFFF");
    should.not.exist(simulation.getError());

    response.x.should.equal(1);
    response.y.should.equal(2);
  });

  it('moves a Mk2 robot correctly',  () => {
    let response = simulation.enterInstructions("2,0,0,FFFRFFFLFFFB");
    should.not.exist(simulation.getError());

    response.x.should.equal(3);
    response.y.should.equal(6); // NB: 'B' is ignored for Mk2

    simulation.clear();

    response = simulation.enterInstructions("2,0,0,BBBLLLFF3F");
    should.not.exist(simulation.getError());

    response.x.should.equal(3); //NB: Boost should be ignored
    response.y.should.equal(0);
  });

  it('moves a Mk3 robot correctly',  () => {
    let response = simulation.enterInstructions("3,0,0,5F2FFRFF5FL5F5F5FR5FLF");
    should.not.exist(simulation.getError());

    response.x.should.equal(10);
    response.y.should.equal(24);
  });

});