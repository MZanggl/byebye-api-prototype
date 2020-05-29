const express = require('express')
const fs = require('fs')
const path = require('path')
var bodyParser = require('body-parser')
const app = express()
const port = 9000

app.use(bodyParser.json())
app.use(express.static('public'))

// this implementation is up to backend framework, can be any language
const files = fs.readdirSync(path.resolve(__dirname, 'actions'))
files.forEach(file => {
  const fullPath = path.resolve(__dirname, 'actions', file)
  const module = require(fullPath)
  if (typeof module !== 'object') {
    throw new Error('Do not default export from actions. It just makes it hard to find out whats going on')
  }

  Object.keys(module).forEach(endpoint => {
    if (typeof module[endpoint] !== 'function') {
      throw new Error(`You can only export functions. [${typeof module[endpoint]}] is not valid.`)
    }
    console.log('registering endpoint...', `/api/${endpoint}`)
    app.post(`/api/${endpoint}`, (req, res) => {
      return res.json(module[endpoint](...req.body.args))
    })
  })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
