require('./progress-cell.scss');

module.exports = /*@ngInject*/ function(buildValues) {
  return {
    restrict: 'E',
    scope: {
      build: '=',
      cellState: '='
    },
    template: require('./progress-cell.html'),
    controller: function($scope) {
      var states = buildValues.get('states');
      var buildStateItem = states.find(function(state) {
        return state.get('type') === $scope.build.get('state');
      });
      var isNotFirstCell = states.indexOf($scope.cellState) !== 0;
      var cellIsBeforeBuildState = states.indexOf($scope.cellState) < states.indexOf(buildStateItem);
      var buildStateIsAfterCell = states.indexOf(buildStateItem) > states.indexOf($scope.cellState);
      var cellIsEqualBuildState = states.indexOf(buildStateItem) === states.indexOf($scope.cellState);
      var isNotLastCell = states.indexOf($scope.cellState) < (states.count() - 1);

      $scope.isLineLeftDisplayed = isNotFirstCell;
      $scope.isLineInnerLeftDisplayed = $scope.isLineLeftDisplayed && (cellIsBeforeBuildState || cellIsEqualBuildState);
      $scope.isLineRightDisplayed = isNotLastCell;
      $scope.isLineInnerRightDisplayed = $scope.isLineRightDisplayed && buildStateIsAfterCell;

      $scope.isInnerCircleDisplayed = states.indexOf(buildStateItem) >= states.indexOf($scope.cellState);
      $scope.isIconDisplayed = states.indexOf(buildStateItem) >= states.indexOf($scope.cellState);
      if ($scope.isIconDisplayed) {
        var iconStatus = (states.indexOf(buildStateItem) > states.indexOf($scope.cellState)) ?
          'success' : $scope.build.get('status');

        $scope.iconDisplayed = buildValues.getIn(['status', iconStatus, 'iconsPalette', 1]);
      }
    }
  };
};
