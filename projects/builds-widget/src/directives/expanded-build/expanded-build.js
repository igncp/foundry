require('./expanded-build.scss');

module.exports = /*@ngInject*/ function(buildValues) {
  return {
    restrict: 'E',
    scope: {
      build: '=',
    },
    template: require('./expanded-build.html'),
    controller: function($scope) {
      var testStates = ['unit', 'functional'];
      var status = buildValues.get('status');
      var buildStatus = $scope.build.get('status');
      var buildState = $scope.build.get('state');
      var buildSectionStatus = (buildState === 'build') ? buildStatus : 'success';

      $scope.parsedBuild = $scope.build.mergeIn(['expandedData'], {});

      $scope.buildClockTime = $scope.build.getIn(['expandedData', 'build', 'completed']);
      $scope.buildIcon = status.getIn([buildSectionStatus, 'iconsPalette', 2]);
      $scope.buildIconStatus = buildSectionStatus;

      $scope.tests = Immutable.List(testStates).map(function(testState) {
        var test = $scope.build.getIn(['expandedData', testState]);
        var testStatus, testIcon, testPercentage, testValues;

        if (test) {
          testStatus = (buildState === testState) ? $scope.build.get('status') : 'success';
          testIcon = status.getIn([testStatus, 'iconsPalette', 2]);
          testPercentage = test.get('success') ? Math.floor(100 * test.get('success') / (test.get('warning') + test.get('success'))) : 0;
          testValues = test.get('success') ? Immutable.List([test.get('warning'), test.get('success')]) : null;
        } else {
          if (buildStatus !== 'error') {
            testStatus = 'waiting';
            testIcon = null;
            testValues = null;
          } else {
            testStatus = 'forbidden';
            testIcon = 'minus-circle';
            testValues = null;
          }
        }
        return {
          type: testState,
          status: testStatus,
          icon: testIcon,
          text: buildValues.get('states').find(function(possibleStatus) {
            return possibleStatus.get('type') === testState;
          }).get('text'),
          percentage: testPercentage,
          values: testValues,
        };
      });
    }
  };
};
