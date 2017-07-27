const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../../../auxiliary');
const app = helpers.app();
const request = supertest(app);
const login = helpers.login;
const db = helpers.db;
const tableQuerys = require('../');

let createStock = tableQuerys.createStock;


describe('#Testing recolhas-tecnicos-verify.js', function() {
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
        .get(`/armazem/recolhas/tecnicos/verify/${createStock[0].serial}`)
        .end(function (err, res) {
         assert.isNotOk(err);
         assert.equal(res.statusCode, 500);
         assert.isOk(res.body);
         done();
        });
    });
  });

  describe('With errors and db',function() {
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

    it('it should return an error if request not found', function (done) {
      request
        .get(`/armazem/recolhas/tecnicos/verify/${createStock[1].serial}`)
        .end(function(err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 404);
          assert.isOk(res.body);
          assert.typeOf(res.body, 'string');
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
    
    it('it should return status 200 if all good', function (done) {
      request
        .get(`/armazem/recolhas/tecnicos/verify/${createStock[0].serial}`)
        .end(function (err, res) {
          assert.isNotOk(err);
          assert.equal(res.statusCode, 200);
          assert.isOk(res.body);
          done();
        });
    });
  });
});
