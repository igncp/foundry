module.exports = function() {
  angular.module('app')
    .constant('buildValues', require('./builds-values'));
};