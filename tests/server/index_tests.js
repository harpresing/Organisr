"use strict";

const chai = require("chai");
const expect = chai.expect;
const request = require('request');

const baseUrl = "http://localhost:5001";

describe('Sample Tests',()=> {
  it('perform basic maths',()=>{
    expect(2 + 2).to.be.equal(4);
  });
});

describe('Index Routes',() => {
  it('serve index.html', (done) =>{
    request({
      method: 'get',
      url: `${baseUrl}/`
    },(err, res)=>{
      if (err) throw err;
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('serve session page', function (done) {
    request({
      method: 'get',
      url: `${baseUrl}/session/112`
    },(err, res)=>{
      if (err) throw err;
      // console.log(res);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
