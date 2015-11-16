const common = require('common/js/common');
const app = angular.module('app', ['ui.router']);

require('./directives').registerDirectives(app);
require('./services').registerServices(app);
require('./router').configure(app);

app.controller('MainCtrl', ['$scope', function($scope) {
  $scope.goToIndex = common.goToIndex;
}]);
