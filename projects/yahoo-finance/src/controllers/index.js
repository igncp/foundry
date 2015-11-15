module.exports = ['$scope', '$http', function($scope, $http) {
  const symbol = "GOOG";
  const now = moment();
  const aWeekBefore = moment().subtract(7, 'days');
  const dateFormat = 'YYYY-MM-DD';

  const format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';
  const query = 'select * from yahoo.finance.historicaldata where symbol = "' + symbol + '" and startDate = "' +
    aWeekBefore.format(dateFormat) + '" and endDate = "' + now.format(dateFormat) + '"';
  const url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + format;

  $scope.results = [];

  $http.jsonp(url).success(function(data) {
    $scope.results = data.query.results.quote;
  });
}];
