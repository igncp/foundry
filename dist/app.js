(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var renderProjects = require('./app/projects').renderProjects;

(function () {
  var fetchAndRender = function fetchAndRender() {
    return $.ajax('projects.json').then(renderProjects);
  };

  $(document).ready(fetchAndRender);
})();

},{"./app/projects":2}],2:[function(require,module,exports){
'use strict';

exports.filterProjects = function (projects) {
  return _.chain(projects).filter(function (project) {
    return project.url;
  }).value();
};

exports.getRowHtml = function (project) {
  return '<span class="col-lg-4">\n  <a href="' + project.url + '">' + project.name + '</a></span><span>' + (project.technologies ? project.technologies.join(' - ') : '') + '\n</span>';
};

exports.createRowEls = function (project) {
  return $('<li class="row">').append(exports.getRowHtml(project));
};

exports.renderProjects = function (projects) {
  var filteredProjects = exports.filterProjects(projects);
  var projectsDomList = _.map(filteredProjects, exports.createRowEls);

  $('#projects').append(projectsDomList);
};

},{}]},{},[1])


//# sourceMappingURL=app.js.map
