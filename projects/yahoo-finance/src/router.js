const indexController = require('controllers/index');

module.exports.configure = function(app) {
  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('index', {
        url: "",
        template: require("partials/index-state.html"),
        controller: indexController
      });
  }]);
};
