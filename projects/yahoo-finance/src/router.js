const indexController = require('controllers/index');

module.exports.configure = function(app) {
  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('index', {
        url: "/",
        templateUrl: "dist/partials/index-state.html",
        controller: indexController
      });
  }]);
};
