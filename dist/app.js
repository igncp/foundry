(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var renderProjects = require('./app/projects').renderProjects;

(function () {
  var fetchAndRender = function fetchAndRender() {
    return $.ajax('/projects.json').then(renderProjects);
  };

  $(document).ready(fetchAndRender);
})();

},{"./app/projects":2}],2:[function(require,module,exports){
'use strict';

var filterProjects = function filterProjects(projects) {
  return _.chain(projects).filter(function (project) {
    return project.url;
  }).value();
};

var generateLinksRows = function generateLinksRows(project) {
  return $('<li>').append($('<a>').text(project.name).attr('href', project.url));
};

var renderProjects = function renderProjects(projects) {
  var filteredProjects = filterProjects(projects);
  var projectsDomList = $.map(filteredProjects, generateLinksRows);

  $('#projects').append(projectsDomList);
};

module.exports = {
  filterProjects: filterProjects,
  generateLinksRows: generateLinksRows,
  renderProjects: renderProjects
};

},{}]},{},[1])


//# sourceMappingURL=app.js.map
