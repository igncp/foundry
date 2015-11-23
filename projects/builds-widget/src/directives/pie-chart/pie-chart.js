require('./pie-chart.scss');

/**
 * renders the SVG pie chart
 * @param  {Immutable.List} values the pie chart raw values (e.g. 2, 19)
 * @param  {Object} elem angular's elem object
 */
function renderChart(values, elem) {
  var segments = values.map(function(value, index) {
    return {
      value: value,
      index: index
    };
  }).toJS();

  var domElem = angular.element(elem)[0];
  var d3Elem = d3.select(domElem.childNodes[0]);
  var width = domElem.parentNode.getBoundingClientRect().width;
  var height = width;
  var radius = Math.floor(width / 2);
  d3Elem.text('');

  var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
      return d.value;
    });

  var svg = d3Elem.append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var g = svg.selectAll(".arc")
    .data(pie(segments))
    .enter().append("g")
    .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .attr("class", function(d) {
      return 'arc-' + d.data.index;
    });

  g.append("text")
    .attr("transform", function(d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .text(function(d) {
      return d.data.age;
    });
}

module.exports = /*@ngInject*/ function() {
  return {
    restrict: 'E',
    scope: {
      values: '=',
    },
    template: require('./pie-chart.html'),
    link: function(scope, elem) {
      renderChart(scope.values, elem);
    }
  };
};
