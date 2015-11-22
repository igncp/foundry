require('./chronometer-time.scss');

/**
 * displays the miliseconds passed
 */
module.exports = /*@ngInject*/ function() {
  return {
    restrict: 'E',
    scope: {
      miliseconds: '=',
    },
    template: require('./chronometer-time.html'),
    controller: function($scope) {
      $scope.chronometerTime = ($scope.miliseconds / 1000).toFixed(2);
    }
  };
};
