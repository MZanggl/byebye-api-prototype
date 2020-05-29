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

---

No more fetch requests to backend, no more setting up API routes, no need for controllers. Leaving you with what is essentially just calling a function (referred to as an action).

Under the hood, it creates the JSON API automatically and turns backend imports on the frontend into HTTP requests (see `backend/index.js` and `magicLoader.js`).

## FAQ

### Inside actions, how can I access things like the authenticated user?

This likely differs from backend language to backend language. Even from backend framework to backend framework.

With frameworks like Laravel you can access the authenticated user by importing the Auth module and then calling `Auth::user()`. It is decoupled from the request object. NodeJs is also getting there with AsyncLocalStorage in the current LTS version (still experimental).

For other language/framework implementations consider dependency injection, function closures, context binding or whatever other fancy options you have at your disposal.

As the last resort you can consider passing symbols as an argument on the frontend that the backend will then convert to the authenticated user and pass it to the action. Be aware of the security implications though. This requies validation checks on the backend function.
