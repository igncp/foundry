module.exports = function() {
  angular.module('app')
    .factory('Build', require('./build'));
};