const express = require('express')
const exphbs = require('express-handlebars')
const port = process.env.PORT || 3000
const path = require('path')
const createPreference = require('./mercadopago/index')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static('assets'))

app.use('/assets', express.static(path.join(__dirname) + '/assets'))

app.get('/', function (req, res) {
  res.render('home')
})

app.get('/detail', async (req, res) => {
  const data = req.query
  const { preferenceId, initPoint } = await createPreference(req.query)
  data.preferenceId = preferenceId
  data.initPoint = initPoint
  res.render('detail', data)
})

app.post('/notification', (req, res) => {
  if (req.method === 'POST') {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })
    req.on('end', () => {
      console.log(body, 'webhook response')
      res.end('ok')
    })
  }
  return res.status(200)
  // res.json(req.body)
})

app.get('/notification', (req, res) => {
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })
  req.on('end', () => {
    console.log(body, 'webhook response')
    res.end('ok')
  })
  res.json(body)
})

app.listen(port)
