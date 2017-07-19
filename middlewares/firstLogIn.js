module.exports = function (req, res, next) {
  if ((req.user.firstLogIn !== 'True')) return next();

  res.render('./pages/newPassword', {message: req.flash('signupMessage'), username: req.user.username});
};
