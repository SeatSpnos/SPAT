module.exports = function (permissions) {
  return function checkPermission (req, res, next) {
    console.log(req.user.username);
    let hasPermission = false;
    if (req.user.required === 'true') res.redirect('/mainpage');

    else {
      for (let i in permissions) {
        if (req.user.group_permission === permissions[i]) {
          hasPermission = true;
        }
      }

      if (hasPermission) next();
      else res.redirect('/mainpage');
    }
  }
};
