import common from 'common/js/common';

const Project = Backbone.Model.extend({
  initialize(projectData) {
    this.set(projectData);
  },
  get(attribute) {
    return (attribute === 'technologies') ?
      this.getTechnologies()
    : (attribute === 'url') ?
      this.getUrl()
    : this.attributes[attribute];
  },
  getUrl() {
    const url = this.attributes.url;
    return (url === '/') ? common.indexSegment : url;
  },
  getTechnologies() {
    return this.attributes.technologies.sort();
  }
});

module.exports = Project;