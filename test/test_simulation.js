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
    response.should.equal(true);

    should.not.exist(simulation.getError());
  });
});