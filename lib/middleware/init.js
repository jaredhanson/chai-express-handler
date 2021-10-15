exports = module.exports = function() {

  return function init(req, res, next) {
    res.locals = res.locals || Object.create(null);
    next();
  };
};
