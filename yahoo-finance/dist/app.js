(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = ['$scope', '$http', function ($scope, $http) {
  var symbol = "GOOG";
  var now = moment();
  var aWeekBefore = moment().subtract(7, 'days');
  var dateFormat = 'YYYY-MM-DD';

  var format = '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK';
  var query = 'select * from yahoo.finance.historicaldata where symbol = "' + symbol + '" and startDate = "' + aWeekBefore.format(dateFormat) + '" and endDate = "' + now.format(dateFormat) + '"';
  var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + format;

  $scope.results = [];

  $http.jsonp(url).success(function (data) {
    $scope.results = data.query.results.quote;
  });
}];

},{}],2:[function(require,module,exports){
'use strict';

module.exports.registerDirectives = function (app) {
  app.directive('lineChart', require('./line-chart'));
};

},{"./line-chart":3}],3:[function(require,module,exports){
"use strict";

var render = function render(scope, elem) {
  var wrapper = d3.select(elem[0]);
  wrapper.text('');

  var data = angular.copy(scope.data);

  var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 100
  };
  var width = 860 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;
  var parseDate = d3.time.format("%Y-%m-%d").parse;

  var x = d3.time.scale().range([0, width]);

  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x).ticks(data.length).orient("bottom");

  var yAxis = d3.svg.axis().scale(y).orient("left");

  var line = d3.svg.line().x(function (d) {
    return x(d.date);
  }).y(function (d) {
    return y(d.Volume);
  });

  var svg = wrapper.append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).attr("class", 'directive-line-chart').append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data.forEach(function (d) {
    d.date = parseDate(d.Date);
    d.Volume = +d.Volume;
  });

  x.domain(d3.extent(data, function (d) {
    return d.date;
  }));
  y.domain(d3.extent(data, function (d) {
    return d.Volume;
  }));

  svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

  svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Volume");

  svg.append("path").datum(data).attr("class", "line").attr("d", line);

  svg.append('g').selectAll('circle').data(data).enter().append("circle").attr({
    cx: function cx(d) {
      return x(d.date);
    },
    cy: function cy(d) {
      return y(d.Volume);
    },
    r: 5
  });
};

module.exports = [function () {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    templateUrl: 'dist/partials/line-chart.directive.html',
    link: function link(scope, elem) {
      render(scope, elem);
      scope.$watch('data', function () {
        return render(scope, elem);
      });
    }
  };
}];

},{}],4:[function(require,module,exports){
'use strict';

var router = require('./router');
var directives = require('./directives');

var app = angular.module('app', ['ui.router']);

directives.registerDirectives(app);
router.configure(app);

},{"./directives":2,"./router":5}],5:[function(require,module,exports){
'use strict';

var indexController = require('controllers/index');

module.exports.configure = function (app) {
  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('index', {
      url: "/",
      templateUrl: "dist/partials/index-state.html",
      controller: indexController
    });
  }]);
};

},{"controllers/index":1}]},{},[4])


//# sourceMappingURL=app.js.map
