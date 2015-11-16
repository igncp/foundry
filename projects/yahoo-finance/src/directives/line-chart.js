const renderChart = function(scope, wrapper) {
  const bodyDims = document.body.getBoundingClientRect();
  const data = angular.copy(scope.data);

  const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 100
  };

  const width = bodyDims.width - margin.left - margin.right - 100;
  const height = 500 - margin.top - margin.bottom;
  const parseDate = d3.time.format("%Y-%m-%d").parse;

  const x = d3.time.scale()
    .range([0, width]);

  const y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(5)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var lineHigh = d3.svg.line()
    .x(d => x(d.date))
    .y(d => y(d.High));

  var lineLow = d3.svg.line()
    .x(d => x(d.date))
    .y(d => y(d.Low));

  var svg = wrapper.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", 'directive-line-chart')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data.forEach(function(d) {
    d.date = parseDate(d.Date);
    d.High = +d.High;
    d.Low = +d.Low;
  });

  const offset = 50;
  const maxY = d3.max(data, d => d.High);
  const minY = d3.min(data, d => d.Low);

  x.domain(d3.extent(data, function(d) {
    return d.date;
  }));
  y.domain([minY - offset, maxY + offset]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Value");

  svg.append("path")
    .datum(data)
    .attr("class", "line high")
    .attr("d", lineHigh);

  svg.append("path")
    .datum(data)
    .attr("class", "line low")
    .attr("d", lineLow);

  const maxItem = R.find(d => d.High === maxY)(data);
  const minItem = R.find(d => d.Low === minY)(data);

  const addExtremeCircle = function(item, prop, color, factor) {
    const gEl = svg.append('g').attr({
      transform: `translate(${x(item.date)},${y(item[prop]) + 4 * factor})`
    });
    gEl.append("circle")
      .attr({
        r: 4,
        fill: color,
        cx: 0,
        cy: 0,
      });
    gEl.append('title').text(item[prop].toFixed(2) + ' : ' + item.Date);
  };

  addExtremeCircle(maxItem, 'High', '#B3DEBC', -1);
  addExtremeCircle(minItem, 'Low', '#FF8C8C', 1);
};

const renderSpinner = function(scope, wrapper) {
  wrapper.append('div').attr({
    'class': 'spinner',
  });
};

const render = function(scope, elem) {
  const wrapper = d3.select(elem[0]);
  wrapper.text('');

  if (scope.state === 'loading') renderSpinner(scope, wrapper);
  else if (scope.state === 'displaying') renderChart(scope, wrapper);
};

module.exports = [function() {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      state: '=',
    },
    template: require('partials/line-chart.directive.html'),
    link: function(scope, elem) {
      render(scope, elem);
      scope.$watch('state', () => render(scope, elem));
    }
  };
}];
