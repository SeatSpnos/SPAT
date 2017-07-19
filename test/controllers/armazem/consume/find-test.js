const assert = require('chai').assert;
const supertest = require('supertest');
const helpers = require('../../auxiliary');
const app = helpers.server();
const request = supertest(app);
const login = helpers.login;

describe('#Armazem_consume find', function () {
  let loginCookie;
  describe('Without errors', function () {
    before(function (done) {
      login(request, function (err, cookie) {
        if (err) throw err;
        loginCookie = cookie;
        done();
      });
    });

    it('Request page to load to server', function (done) {
      request
        .get('/armazem_consume')
        .set('cookie', loginCookie)
        .end(function (err, res) {
          assert.notOk(err);
          assert.ok(res);
          assert.ok(res.body.tecs);
          assert.ok(res.body.user);
          assert.ok(res.body.items);
          assert.ok(res.body.category);
          assert.equal(res.statusCode, 200);
          done();
        });
    });

    it('Request server all items belonging to a category and a tec', function (done) {
      request
        .get('/armazem_consume_getCategory')
        .set('cookie', loginCookie)
        .query({category: 'Consumiveis', tec: 'Abel Bexigas'})
        .end(function (err, res) {
          assert.notOk(err);
          assert.ok(res);
          assert.ok(res.body);
          assert.equal(res.statusCode, 200);
          done();
        });
    });

    it('Request server Tec stock', function (done) {
      request
        .get('/armazem_delivery_getTec')
        .set('cookie', loginCookie)
        .query({tec: 'Abel Bexigas'})
        .end(function (err, res) {
          assert.notOk(err);
          assert.ok(res);
          assert.ok(res.body.serial);
          assert.ok(res.body.noSerial);
          assert.equal(res.statusCode, 200);
          done();
        });
    });

    it('Request server to ', function (done) {
      request
        .get('/armazem_delivery_getTecItem')
        .set('cookie', loginCookie)
        .query({ tec: 'Abel Bexigas', item: '' })
        .end(function (err, res) {
          assert.notOk(err);
          assert.ok(res);
          assert.equal(res.statusCode, 200);
          done();
        });
    });
  });
});
