module.exports = /*@ngInject*/ function($scope, Build) {
  (function activate() {
    Build.list().then(function(builds) {
      $scope.builds = builds;
    });
  })();
};