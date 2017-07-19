module.exports = function (request, next) {
  request
    .post('/login')
    .send({ username: 'fcrespim', password: 'BVL_pc89' })
    .end(function (error, response) {
      if (error) next(error);
      next(null, response.headers['set-cookie']);
    });
};
