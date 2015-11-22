module.exports = /*@ngInject*/ function($http) {
  return {
    get: get,
    list: list,
  };

  function get(changelist) {
    return $http.get('data/build-' + changelist + '.json').then(function(res) {
      return Immutable.fromJS(res.data);
    });
  }

  function list() {
    return $http.get('data/builds-list.json').then(function(res) {
      return Immutable.fromJS(res.data);
    });
  }
};
