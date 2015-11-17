const ProjectsList = require('app/views/ProjectsList');

module.exports = function() {
  const view = new ProjectsList({
    el: '#page',
    data: this.app.data,
  });

  this.app.views.push({
    routeController: 'index',
    view: view,
  });
};