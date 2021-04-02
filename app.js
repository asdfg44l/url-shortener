const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const { urlencoded } = require('body-parser')
const validUrl = require('valid-url');

const ShortenerUrl = require('./models/shortenerUrl')
const { getShortenerUrl } = require('./utils/shortenerUrlGenerator')

//mongodb
require('./config/mongoose')

//PORT
const baseUrl = 'http://localhost:3000/'
const PORT = 3000

//view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//body-parser
app.use(urlencoded({ extended: true }))

//route


app.get('/', (req, res) => {
    return res.render('index')
    // res.redirect('www.google.com')
})

app.post('/shortener-url', async (req, res) => {
    const { url } = req.body
    //check if url isValid
    if (!validUrl.isWebUri(url)) {
        return res.render('index', { url, error: '錯誤的網址格式' })
    }
    let randomCode = ''
    let isSame = true
    while (isSame) {
        //prevent repeat shortener url
        randomCode = getShortenerUrl(5)
        let sameRedirect = await ShortenerUrl.findOne({ redirect: randomCode })
        if (sameRedirect) {
            isSame = true
            continue
        }
        //update while origin url already exist
        let sameContent = await ShortenerUrl.findOneAndUpdate({ content: url }, { redirect: randomCode })
        //else create a new one
        if (!sameContent) {
            await ShortenerUrl.create({ content: url, redirect: randomCode })
        }

        isSame = false
    }

    return res.render('index', { url, shortenerUrl: randomCode, urlContent: baseUrl + randomCode })
})

app.get('/:id', async (req, res) => {
    const randomCode = req.params.id
    let shortenerUrl = await ShortenerUrl.findOne({ redirect: randomCode }).lean()
    return res.redirect(shortenerUrl.content)
})

//404 handler: https://expressjs.com/zh-tw/starter/faq.html
app.use((req, res, next) => {
    res.status(404).send('Not found');
    next()
})

//listening
app.listen(PORT, () => {
    console.log(`server is listening on Port: ${PORT}`)
})