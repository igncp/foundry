const Projects = require('app/collections/Projects');

const ProjectsList = Backbone.View.extend({
  tagName: 'ul',
  el: '#projects-list',
  events: {},
  initialize({
    projects, last_commit
  }) {
    this.projects = new Projects(projects);
    this.last_commit = last_commit;
    this.render();
  },
  rowTemplateFn() {
    return _.template('<li class="row"><span class="col-sm-3 col-lg-2">' +
      '<a href="<%= get("url") %>"><%= get("name") %></a>' +
      '</span>' +
      '<span class="col-sm-8 col-lg-4"><%= get("technologies") ? get("technologies").join(" • ") : "" %></span>' +
      '<span class="col-sm-1 col-lg-4 show-code">' +
      '<a href="https://github.com/igncp/foundry/tree/' + this.last_commit + '/<%= get("location") %>">' +
      '<i class="fa fa-folder-open-o" title="code"></i>' +
      '</a>' +
      '</span></li>');
  },
  render() {
    const rowTemplate = this.rowTemplateFn();
    this.$el.html(this.projects
      .map((project) => rowTemplate(project))
      .join(''));
    return this;
  }
});

module.exports = ProjectsList;
