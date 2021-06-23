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
  const preferenceId = await createPreference(req.query)
  data.preferenceId = preferenceId
  res.render('detail', data)
})

app.listen(port)
