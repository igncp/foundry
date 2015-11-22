module.exports = function() {
  angular.module('app')
    .config(/*@ngInject*/ function($stateProvider) {
      $stateProvider
        .state('index', require('states/landing/landing'));
    });
};
