const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

//PORT
const PORT = 3000

//view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    return res.render('index')
})

//listening
app.listen(PORT, () => {
    console.log(`server is listening on Port: ${PORT}`)
})