const { getOptions, interpolateName,  } = require('loader-utils');


module.exports = function magicLoader(source) {
  const options = getOptions(this);
  const endpoint = interpolateName(this, options.name, { content: source });
  const fullPath = interpolateName(this, options.path, { content: source });

  const module = require(fullPath + endpoint)
  const result = Object.keys(module).map(endpoint => {
    return `exports.${endpoint} = function fetchFromBackend(...args) {
      return fetch('/api/${endpoint}', {
        method: "POST",
        body: JSON.stringify({ args }),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json()).then(res => res.result)
    }`
  })

  return result.join('\n')
}