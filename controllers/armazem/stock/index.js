const FIND = require('./find');

module.exports = {
  find: find
};

function find (req, res, next) {
  FIND(req, res, next);
}