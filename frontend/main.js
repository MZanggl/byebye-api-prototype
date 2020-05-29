const { getProject } = require('../backend/actions/projects')

getProject(1).then(project => {
  document.getElementById('app').innerHTML = JSON.stringify(project)
})