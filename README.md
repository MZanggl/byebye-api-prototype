Bye bye API layer. Uniting frontend and backend - Prototype

Seamless integration of frontend and backend (language agnostic).

**Frontend**

```javascript
const { getProject } = require('../backend/actions/projects')

getProject(1).then(project => {
  document.getElementById('app').innerHTML = JSON.stringify(project)
})
```

**Backend**

```javascript
// backend/actions/projects.js

exports.getProject = async (id) => {
  return { id, name: 'dummy' }
}
```