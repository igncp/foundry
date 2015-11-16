module.exports.registerServices = function(app) {
  app.factory('api', require('./api.service'));
};