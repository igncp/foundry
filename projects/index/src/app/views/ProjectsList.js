const Projects = require('app/collections/Projects');

const ProjectsList = Backbone.View.extend({
  tagName: 'div',
  events: {},
  initialize(opts) {
    _.merge(this, opts);
    this.projects = new Projects(this.data.projects);
    this.render();
  },
  rowTemplateFn() {
    return _.template('<li class="row"><span class="col-sm-3 col-lg-2">' +
      '<a href="<%= get("url") %>"><%= get("name") %></a>' +
      '</span>' +
      '<span class="col-sm-8 col-lg-4"><%= get("technologies") ? get("technologies").join(" • ") : "" %></span>' +
      '<span class="col-sm-1 col-lg-4 show-code">' +
      '<a href="https://github.com/igncp/foundry/tree/' + this.data.last_commit + '/<%= get("location") %>">' +
      '<i class="fa fa-folder-open-o" title="code"></i>' +
      '</a>' + '</span></li>');
  },
  render() {
    const rowTemplate = this.rowTemplateFn();
    
    this.$el.html(`<div id="projects" class="col-sm-10 col-sm-offset-1">
        <h3>Projects (${this.projects.length})</h3>
        <ul id="projects-list">
          ${this.projects.map(rowTemplate).join('')}
        </ul>
    </div>`);
    return this;
  }
});

module.exports = ProjectsList;
