(function(scope) {
  var common = {};

  common.goToIndex = function() {
    location.replace('/foundry');
  };

  if (typeof define === 'function') {
    define('foundryCommon', common);
  } else if (typeof module === 'object') {
    module.exports = common;
  } else scope.foundryCommon = common;
})(window);
