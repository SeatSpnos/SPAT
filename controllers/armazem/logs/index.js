const FIND = require('./find');

module.exports = {
  find: find,
  findOptions: findOptions
};

function find (req, res, next) {
  FIND.render(req, res, next);
}

function findOptions (req, res, next) {
  FIND.options(req, res, next);
}