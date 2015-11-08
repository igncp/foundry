const filterProjects = projects => _.chain(projects).filter(project => project.url).value();

const generateLinksRows = project => $('<li>').append($('<a>').text(project.name).attr('href', project.url));

const renderProjects = (projects)=> {
  const filteredProjects = filterProjects(projects);
  const projectsDomList = $.map(filteredProjects, generateLinksRows);

  $('#projects').append(projectsDomList);
}

module.exports = {
  filterProjects: filterProjects,
  generateLinksRows: generateLinksRows,
  renderProjects: renderProjects
};