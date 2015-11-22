require('./clock-time.scss');

/**
 * displays the time (e.g. 1:42 pm)
 */
module.exports = /*@ngInject*/ function() {
  return {
    restrict: 'E',
    scope: {
      timestamp: '=',
    },
    template: require('./clock-time.html'),
    controller: function($scope) {
      $scope.clockTime = moment.unix($scope.timestamp).format('h:mm a');
    }
  };
};