(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/* globals ga */

(function (scope) {
  var common = {};

  common.indexSegment = '/foundry';

  common.goToIndex = function () {
    location.replace(common.indexSegment);
  };

  common.trackAnalytics = function () {
    (function (i, s, o, g, r, a, m) {
      i.GoogleAnalyticsObject = r;
      i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
      }, i[r].l = 1 * new Date();
      a = s.createElement(o), m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-70138305-1', 'auto');
    ga('send', 'pageview');
  };

  if (typeof define === 'function') {
    define('foundryCommon', common);
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') {
    module.exports = common;
  } else scope.foundryCommon = common;
})(window);

},{}],2:[function(require,module,exports){
'use strict';

var mapIndexed = R.addIndex(R.map);

var setHighLowExtremeFn = function setHighLowExtremeFn(extreme, items, differences) {
  var highLowExtreme = R.reduce(R[extreme + 'By'](function (difference) {
    return difference.value;
  }), {
    value: extreme === 'min' ? 100000 : 0
  })(differences);

  var highLowExtremeItem = R.clone(items[highLowExtreme.index]);
  highLowExtremeItem.value = highLowExtreme.value;

  return highLowExtremeItem;
};

var getStats = function getStats(items) {
  var stats = {};
  var differences = mapIndexed(function (item, index) {
    return {
      index: index, value: +item.High - +item.Low
    };
  }, items);

  stats.highLowMean = items.length ? R.reduce(function (sum, difference) {
    return sum + difference.value;
  }, 0)(differences) / items.length : 0;

  var setHighLowExtreme = R.partialRight(setHighLowExtremeFn, [items, differences]);
  stats.highLowMaxItem = setHighLowExtreme('max');
  stats.highLowMinItem = setHighLowExtreme('min');

  return stats;
};

module.exports = ['$scope', 'api', function ($scope, api) {
  $scope.showStats = false;
  $scope.state = 'loading';
  $scope.to = moment();
  $scope.from = moment().subtract(1, 'years');
  $scope.symbol = 'GOOG';

  api.get({
    symbol: $scope.symbol,
    to: $scope.to,
    from: $scope.from
  }).success(function (data) {
    $scope.state = 'displaying';
    $scope.results = data.query.results.quote;
    $scope.stats = getStats($scope.results);
    $scope.showStats = true;
  });
}];

},{}],3:[function(require,module,exports){
'use strict';

module.exports.registerDirectives = function (app) {
  app.directive('lineChart', require('./line-chart'));
};

},{"./line-chart":4}],4:[function(require,module,exports){
"use strict";

var renderChart = function renderChart(scope, wrapper) {
  var bodyDims = document.body.getBoundingClientRect();
  var data = angular.copy(scope.data);

  var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 100
  };

  var width = bodyDims.width - margin.left - margin.right - 100;
  var height = 500 - margin.top - margin.bottom;
  var parseDate = d3.time.format("%Y-%m-%d").parse;

  var x = d3.time.scale().range([0, width]);

  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x).ticks(5).orient("bottom");

  var yAxis = d3.svg.axis().scale(y).orient("left");

  var lineHigh = d3.svg.line().x(function (d) {
    return x(d.date);
  }).y(function (d) {
    return y(d.High);
  });

  var lineLow = d3.svg.line().x(function (d) {
    return x(d.date);
  }).y(function (d) {
    return y(d.Low);
  });

  var svg = wrapper.append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).attr("class", 'directive-line-chart').append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data.forEach(function (d) {
    d.date = parseDate(d.Date);
    d.High = +d.High;
    d.Low = +d.Low;
  });

  var offset = 50;
  var maxY = d3.max(data, function (d) {
    return d.High;
  });
  var minY = d3.min(data, function (d) {
    return d.Low;
  });

  x.domain(d3.extent(data, function (d) {
    return d.date;
  }));
  y.domain([minY - offset, maxY + offset]);

  svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

  svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Value");

  svg.append("path").datum(data).attr("class", "line high").attr("d", lineHigh);

  svg.append("path").datum(data).attr("class", "line low").attr("d", lineLow);

  var maxItem = R.find(function (d) {
    return d.High === maxY;
  })(data);
  var minItem = R.find(function (d) {
    return d.Low === minY;
  })(data);

  var addExtremeCircle = function addExtremeCircle(item, prop, color, factor) {
    var gEl = svg.append('g').attr({
      transform: "translate(" + x(item.date) + "," + (y(item[prop]) + 4 * factor) + ")"
    });
    gEl.append("circle").attr({
      r: 4,
      fill: color,
      cx: 0,
      cy: 0
    });
    gEl.append('title').text(item[prop].toFixed(2) + ' : ' + item.Date);
  };

  addExtremeCircle(maxItem, 'High', '#B3DEBC', -1);
  addExtremeCircle(minItem, 'Low', '#FF8C8C', 1);
};

var renderSpinner = function renderSpinner(scope, wrapper) {
  wrapper.append('div').attr({
    'class': 'spinner'
  });
};

var render = function render(scope, elem) {
  var wrapper = d3.select(elem[0]);
  wrapper.text('');

  if (scope.state === 'loading') renderSpinner(scope, wrapper);else if (scope.state === 'displaying') renderChart(scope, wrapper);
};

module.exports = [function () {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      state: '='
    },
    template: require('partials/line-chart.directive.html'),
    link: function link(scope, elem) {
      render(scope, elem);
      scope.$watch('state', function () {
        return render(scope, elem);
      });
    }
  };
}];

},{"partials/line-chart.directive.html":7}],5:[function(require,module,exports){
'use strict';

var common = require('common/js/common');
var app = angular.module('app', ['ui.router']);

require('./directives').registerDirectives(app);
require('./services').registerServices(app);
require('./router').configure(app);

app.controller('MainCtrl', ['$scope', function ($scope) {
  $scope.goToIndex = common.goToIndex;
}]);

},{"./directives":3,"./router":8,"./services":10,"common/js/common":1}],6:[function(require,module,exports){
module.exports = "<h1><i>Still under early construction</i></h1>\n<div>\n    <p>From <strong>{{from.fromNow()}} ({{from.calendar()}})</strong> to <strong>{{to.fromNow()}} ({{to.format('h:mm:ss a')}})</strong> with <strong>{{symbol}}</strong>.</p>\n    <line-chart data=\"results\" state=\"state\"></line-chart>\n    <div ng-if=\"showStats\">\n        <p>High - Low difference mean: <strong>{{stats.highLowMean.toFixed(2)}}</strong></p>\n        <p>High - Low difference maximum: <strong>{{stats.highLowMaxItem.value.toFixed(2)}}</strong> ({{stats.highLowMaxItem.Date}})</p>\n        <p>High - Low difference minimum: <strong>{{stats.highLowMinItem.value.toFixed(2)}}</strong> ({{stats.highLowMinItem.Date}})</p>\n    </div>\n</div>";

},{}],7:[function(require,module,exports){
module.exports = "<div></div>";

},{}],8:[function(require,module,exports){
'use strict';

var indexController = require('controllers/index');

module.exports.configure = function (app) {
  app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('index', {
      url: "",
      template: require("partials/index-state.html"),
      controller: indexController
    });
  }]);
};

},{"controllers/index":2,"partials/index-state.html":6}],9:[function(require,module,exports){
'use strict';

module.exports = ['$http', function ($http) {
  var api = {};

  api.get = function (opts) {
    var dateFormat = 'YYYY-MM-DD';

    var format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';
    var query = 'select * from yahoo.finance.historicaldata where symbol = "' + opts.symbol + '" and startDate = "' + opts.from.format(dateFormat) + '" and endDate = "' + opts.to.format(dateFormat) + '"';
    var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + format;

    return $http.jsonp(url);
  };

  return api;
}];

},{}],10:[function(require,module,exports){
'use strict';

module.exports.registerServices = function (app) {
  app.factory('api', require('./api.service'));
};

},{"./api.service":9}]},{},[5])


//# sourceMappingURL=app.js.map
