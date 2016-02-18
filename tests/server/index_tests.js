"use strict";

const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
/*eslint-disable */
const should = chai.should();
/*eslint-enable */
chai.use(chaiHttp);
//Run an instance of the server
const server = require("./../../server");

describe('Sample Tests',()=> {
  it('perform basic maths',()=>{
    expect(2 + 2).to.be.equal(4);
  });
});

describe('Index Routes',() => {
  it('serve index.html', (done) =>{
    chai.request(server)
      .get('/')
      .end((err,res)=>{
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
  it('servers login.html',(done) =>{
    chai.request(server)
      .get('/login')
      .end((err,res)=>{
        expect(res).to.have.status(200);
        res.should.be.html;
        done();
      });
  });
});
