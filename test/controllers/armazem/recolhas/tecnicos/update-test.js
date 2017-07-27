const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../../../auxiliary');
const app = helpers.app();
const request = supertest(app);
const login = helpers.login;
const db = helpers.db;
const tableQuerys = require('../');

let createStock = tableQuerys.createStock;

describe('#Testing recolhas-tecnicos-update.js', function() {
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
				.put(`/armazem/recolhas/tecnicos`)
				.end(function (err, res) {
				assert.isNotOk(err);
				assert.equal(res.statusCode, 500);
				assert.isOk(res.body);
				done();
				});
		});
	});

	describe('Without errors with db', function() {
		before(function (done) {
			login(request, function (err, cookie) {
				if (err) throw err;
				loginCookie = cookie;
				db.start(function() {
				  db.query(null, tableQuerys.createTable, function() {
				  	console.log('Table created!')
				    let query = `INSERT INTO armazem_recolhas SET ?`
				    db.query(null, query, createStock[1], done) 
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

		it('It should update currentOwner and caixa fields', function(done) {
			request
			.put(`/armazem/recolhas/tecnicos`)
  		.send({ box: createStock[1].caixa, serials: createStock[1].serial })
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
