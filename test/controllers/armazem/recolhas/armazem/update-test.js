const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../../../auxiliary');
const app = helpers.app();
const request = supertest(app);
const login = helpers.login;
const db = helpers.db;
const tableQuerys = require('../');

let createStock = tableQuerys.createStock;

describe('#Testing recolhas-armazem-update-test.js', function() {
  describe('With errors and without db', function() {
    before(function (done) {
      login(request, function (err, cookie) {
        if (err) throw err;
        loginCookie = cookie;
        done();
      });
    });
    after(function (done) {
      done();
    });

    it('it should return an error 500 when there is no connection to db', function (done) {
      request
        .put(`/armazem/recolhas/armazem/`)
        .send( {palete: createStock[0].palete, boxes: createStock[0].caixa})
        .end(function (err, res) {
         assert.isNotOk(err);
         assert.equal(res.statusCode, 500);
         assert.isOk(res.body);
         done();
        });
    });
  });

  describe('Without errors with db',function() {
    before(function (done) {
      login(request, function (err, cookie) {
        if (err) throw err;
        loginCookie = cookie;
        db.start(function() {
          db.query(null, tableQuerys.createTable, function() {
            let query = `INSERT INTO armazem_recolhas SET ?`
            db.query(null, query, createStock[0], done);
          });
        });
      });
    });

    after(function (done) {
      db.query(null, tableQuerys.clearTable, function(err, rows) {
        console.log('Table Erased!');
        db.close(done); 
      });
    });
    
    it('it should return the box Items if all went well', function (done) {
      request
        .put(`/armazem/recolhas/armazem/`)
        .send( {palete: createStock[0].palete, boxes: createStock[0].caixa})
        .end(function (err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 200);
          assert.isOk(res.body);
          assert.equal(res.body.affectedRows, 1)
          done();
        });
    });
  });
});

