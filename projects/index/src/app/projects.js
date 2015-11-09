exports.filterProjects = projects => _.chain(projects).filter(project => project.url).value();

exports.getRowHtml = project => `<span class="col-lg-4">
  <a href="${project.url}">${project.name}</a></span><span>${project.technologies ? project.technologies.join(' - ') : ''}
</span>`;

exports.createRowEls = project => $('<li class="row">').append(exports.getRowHtml(project));

exports.renderProjects = (projects)=> {
  const filteredProjects = exports.filterProjects(projects);
  const projectsDomList =_.map(filteredProjects, exports.createRowEls);

  $('#projects').append(projectsDomList);
};
