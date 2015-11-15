const render = function(scope, elem) {
  const wrapper = d3.select(elem[0]);
  wrapper.text('');

  const data = angular.copy(scope.data);

  const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 100
  };
  const width = 860 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  const parseDate = d3.time.format("%Y-%m-%d").parse;

  const x = d3.time.scale()
    .range([0, width]);

  const y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(data.length)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var line = d3.svg.line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.Volume);
    });

  var svg = wrapper.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", 'directive-line-chart')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data.forEach(function(d) {
    d.date = parseDate(d.Date);
    d.Volume = +d.Volume;
  });

  x.domain(d3.extent(data, function(d) {
    return d.date;
  }));
  y.domain(d3.extent(data, function(d) {
    return d.Volume;
  }));

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
    .text("Volume");

  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

  svg.append('g')
    .selectAll('circle')
    .data(data)
    .enter()
    .append("circle")
    .attr({
      cx: d => x(d.date),
      cy: d => y(d.Volume),
      r: 5
    });
};

module.exports = [function() {
  return {
    restrict: 'E',
    scope: {
      data: '=',
    },
    templateUrl: 'dist/partials/line-chart.directive.html',
    link: function(scope, elem) {
      render(scope, elem);
      scope.$watch('data', () => render(scope, elem));
    }
  };
}];
