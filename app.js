const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const { urlencoded } = require('body-parser')

//mongodb
require('./config/mongoose')

//PORT
const PORT = 3000

//view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//body-parser
app.use(urlencoded({ extended: true }))

//route
app.get('/', (req, res) => {
    return res.render('index')
})

app.post('/shortener-url', (req, res) => {
    console.log(req.body)
    return res.redirect('/')
})


//listening
app.listen(PORT, () => {
    console.log(`server is listening on Port: ${PORT}`)
})