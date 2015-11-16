const mapIndexed = R.addIndex(R.map);

const setHighLowExtremeFn = function(extreme, items, differences) {
  const highLowExtreme = R.reduce(R[extreme + 'By'](difference => difference.value), {
    value: (extreme === 'min') ? 100000 : 0,
  })(differences);

  const highLowExtremeItem = R.clone(items[highLowExtreme.index]);
  highLowExtremeItem.value = highLowExtreme.value;

  return highLowExtremeItem;
};

const getStats = function(items) {
  const stats = {};
  const differences = mapIndexed((item, index) => {
    return {
      index, value: +item.High - (+item.Low)
    };
  }, items);

  stats.highLowMean = items.length ?
    R.reduce((sum, difference) => sum + difference.value, 0)(differences) / items.length : 0;

  const setHighLowExtreme = R.partialRight(setHighLowExtremeFn, [items, differences]);
  stats.highLowMaxItem = setHighLowExtreme('max');
  stats.highLowMinItem = setHighLowExtreme('min');

  return stats;
};

module.exports = ['$scope', 'api', function($scope, api) {
  $scope.showStats = false;
  $scope.state = 'loading';
  $scope.to = moment();
  $scope.from = moment().subtract(1, 'years');
  $scope.symbol = 'GOOG';

  api.get({
    symbol: $scope.symbol,
    to: $scope.to,
    from: $scope.from,
  }).success(function(data) {
    $scope.state = 'displaying';
    $scope.results = data.query.results.quote;
    $scope.stats = getStats($scope.results);
    $scope.showStats = true;
  });
}];
