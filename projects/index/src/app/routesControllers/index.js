const ProjectsList = require('app/views/ProjectsList');

module.exports = function() {
  const view = new ProjectsList(this.app.data);

  this.app.views.push({
    routeController: 'index',
    view: view,
  });
};