exports = module.exports = function() {

  return function init(req, res, next) {
    req.params = req.params || {};
    res.locals = res.locals || Object.create(null);
    next();
  };
};
