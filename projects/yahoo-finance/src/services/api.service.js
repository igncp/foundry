module.exports = ['$http', function($http) {
  const api = {};

  api.get = function(opts) {
    const dateFormat = 'YYYY-MM-DD';

    const format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';
    const query = 'select * from yahoo.finance.historicaldata where symbol = "' + opts.symbol + '" and startDate = "' +
      opts.from.format(dateFormat) + '" and endDate = "' + opts.to.format(dateFormat) + '"';
    const url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + format;

    return $http.jsonp(url);
  };

  return api;
}];
