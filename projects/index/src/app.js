const renderProjects = require('./app/projects').renderProjects;

(() => {
  const fetchAndRender = ()=> $.ajax('projects.json').then(renderProjects);

  $(document).ready(fetchAndRender);
})();
