module.exports.registerDirectives = function(app) {
  app.directive('lineChart', require('./line-chart'));
};