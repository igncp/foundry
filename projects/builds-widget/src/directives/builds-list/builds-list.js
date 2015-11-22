require('./builds-list.scss');

module.exports = /*@ngInject*/ function(Build, buildValues) {
  return {
    restrict: 'E',
    scope: {
      builds: '='
    },
    template: require('./builds-list.html'),
    controller: function($scope) {
      $scope.parsedBuilds = [];

      $scope.possibleStates = buildValues.get('states');

      $scope.expandOrCollapse = expandOrCollapse;

      $scope.$watch('builds', buildWatch);

      function buildWatch() {
        if ($scope.builds) {
          $scope.parsedBuilds = $scope.builds.map(function(build) {
            var startedOn = moment.unix(build.get('started_on'));
            var status = buildValues.getIn(['status', build.get('status')]);
            return build.merge({
              'started_on_date': startedOn.format('M/D/YYYY'),
              'status_text': status.get('text'),
              'status_icon': status.get('iconsPalette').get(0),
              'isExpanded': false
            });
          });
        }
      }

      function expandOrCollapse(build) {
        var buildIndex = $scope.parsedBuilds.indexOf(build);
        var newBuild = build.set('isExpanded', !build.get('isExpanded'));

        if (newBuild.get('isExpanded')) {
          Build.get(newBuild.get('changelist')).then(function(build) {
            newBuild = newBuild.set('expandedData', build);
            $scope.parsedBuilds = $scope.parsedBuilds.set(buildIndex, newBuild);
            $scope.$applyAsync();
          });
        } else {
          $scope.parsedBuilds = $scope.parsedBuilds.set(buildIndex, newBuild);
        }
      }
    }
  };
};
