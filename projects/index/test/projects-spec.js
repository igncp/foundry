"use strict";

describe('projects', () => {
  let projects;

  beforeEach(() => {
    projects = require('../src/app/projects')
  });
  describe('filterProjects', () => {
    it("doesn't pick projects without urls", () => {
      const projectsArr = [{
        url: 'foo'
      }, {}];
      const filteredProjects = projects.filterProjects(projectsArr);

      expect(filteredProjects.length).to.eql(1);
      expect(filteredProjects[0].url).to.eql('foo');
    });
  });
})
