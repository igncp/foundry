(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/* globals ga */

(function (scope) {
  var common = {};

  common.goToIndex = function () {
    location.replace('/foundry');
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

var foundryCommon = require('./common/js/common');
var router = require('./app/Router').get();

var start = function start(appData) {
  router.app.data = appData;
  router.init();
};
$(document).ready(function () {
  foundryCommon.trackAnalytics();
  $.ajax('foundry.json').then(start);
});

},{"./app/Router":3,"./common/js/common":1}],3:[function(require,module,exports){
"use strict";

var indexController = require('app/routesControllers/index');

var Router = Backbone.Router.extend({
  routes: {
    "": indexController
  },
  goTo: function goTo(fragment, options) {
    this.navigate(fragment, _.merge({
      trigger: true,
      replace: true
    }, options));
  },

  init: Backbone.history.start.bind(Backbone.history),
  getFragment: Backbone.history.getFragment.bind(Backbone.history)
});

var router = new Router();

router.app = {
  views: [],
  models: [],
  collections: []
};
Router.get = function () {
  return router;
};
module.exports = Router;

},{"app/routesControllers/index":6}],4:[function(require,module,exports){
'use strict';

var Project = require('app/models/Project');

var Projects = Backbone.Collection.extend({
  model: Project,
  initialize: function initialize(projectsData) {
    var _this = this;

    var projects = _.map(projectsData, function (projectData) {
      return new _this.model(projectData);
    });
    this.push(projects);
  }
});

module.exports = Projects;

},{"app/models/Project":5}],5:[function(require,module,exports){
'use strict';

var Project = Backbone.Model.extend({
  initialize: function initialize(projectData) {
    this.set(projectData);
  },
  get: function get(attribute) {
    return attribute === 'technologies' ? this.getTechnologies() : this.attributes[attribute];
  },
  getTechnologies: function getTechnologies() {
    return this.attributes.technologies.sort();
  }
});

module.exports = Project;

},{}],6:[function(require,module,exports){
'use strict';

var ProjectsList = require('app/views/ProjectsList');

module.exports = function () {
  var view = new ProjectsList(this.app.data);

  this.app.views.push({
    routeController: 'index',
    view: view
  });
};

},{"app/views/ProjectsList":7}],7:[function(require,module,exports){
'use strict';

var Projects = require('app/collections/Projects');

var ProjectsList = Backbone.View.extend({
  tagName: 'ul',
  el: '#projects-list',
  events: {},
  initialize: function initialize(_ref) {
    var projects = _ref.projects;
    var last_commit = _ref.last_commit;

    this.projects = new Projects(projects);
    this.last_commit = last_commit;
    this.render();
  },
  rowTemplateFn: function rowTemplateFn() {
    return _.template('<li class="row"><span class="col-sm-3 col-lg-2">' + '<a href="<%= get("url") %>"><%= get("name") %></a>' + '</span>' + '<span class="col-sm-8 col-lg-4"><%= get("technologies") ? get("technologies").join(" • ") : "" %></span>' + '<span class="col-sm-1 col-lg-4 show-code">' + '<a href="https://github.com/igncp/foundry/tree/' + this.last_commit + '/<%= get("location") %>">' + '<i class="fa fa-folder-open-o" title="code"></i>' + '</a>' + '</span></li>');
  },
  render: function render() {
    var rowTemplate = this.rowTemplateFn();
    this.$el.html(this.projects.map(function (project) {
      return rowTemplate(project);
    }).join(''));
    return this;
  }
});

module.exports = ProjectsList;

},{"app/collections/Projects":4}]},{},[2])


//# sourceMappingURL=app.js.map
