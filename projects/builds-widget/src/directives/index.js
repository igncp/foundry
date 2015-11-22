module.exports = function() {
  angular.module('app')
    .directive('buildsList', require('./builds-list/builds-list'))
    .directive('chronometerTime', require('./chronometer-time/chronometer-time'))
    .directive('clockTime', require('./clock-time/clock-time'))
    .directive('expandedBuild', require('./expanded-build/expanded-build'))
    .directive('pieChart', require('./pie-chart/pie-chart'))
    .directive('stateDisplay', require('./progress-cell/progress-cell'));
};