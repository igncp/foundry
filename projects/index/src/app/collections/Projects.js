const Project = require('app/models/Project');

const Projects = Backbone.Collection.extend({
  model: Project,
  initialize(projectsData) {
    const projects = _.map(projectsData, projectData => new this.model(projectData));
    this.push(projects);
  },
});

module.exports = Projects;