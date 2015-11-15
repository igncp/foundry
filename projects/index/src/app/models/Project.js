const Project = Backbone.Model.extend({
  initialize(projectData) {
    this.set(projectData);
  },
  get(attribute) {
    return (attribute === 'technologies') ?
      this.getTechnologies()
    : this.attributes[attribute];
  },
  getTechnologies() {
    return this.attributes.technologies.sort();
  }
});

module.exports = Project;