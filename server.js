const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const logger = require('morgan')
const flash = require('connect-flash')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
const expresshandlebars = require('express-handlebars')
const port = 3000;
const MONGO_URL = require('./config/db').MONGOURL

// ============configuring database===========
mongoose.Promise = global.Promise
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('database connected successfully')
}).catch(err => {
    console.log('database connection failed')
})


const app = express();

// ===setting up morgan at development stage=============
app.use(logger('dev'))

// =========configuring  the express-handlebars template engine
app.engine('.hbs', expresshandlebars({
    defaultLayout: 'layout',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

// =============setting up the path to the public files==========
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
        extended: true
    }))
    // =======setting up flash and other enviromental varialbles=================

app.use(session({
    secret: 'fhgdfdjgdg',
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        maxAge: 180 * 60 * 1000
    }
}))
app.use(flash())
app.use((req, res, next) => {
        res.locals.success_messages = req.flash('success')
        res.locals.error_messages = req.flash('error')
        res.locals.user = req.user ? true : false
        res.locals.session = req.session
        next()
    })
    // =============Route grouping =================
app.use('/', require('./routes/index'))
app.use('/admin', require('./routes/admin'))



app.listen(port, (req, res) => {
    console.log('server listening at port ' + port);
});