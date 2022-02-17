const express = require('express');
const errorHandlers = require('errorhandler');
const app = express();
const path = require('path');
const port = 3000;
const dotenv = require('dotenv');
const Prismic = require('@prismicio/client');
const PrismicDOM = require('prismic-dom');
const fs = require('fs');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const logger = require('morgan');
dotenv.config();

const IS_DEVELOPMENT = process.env.NODE_ENV = 'dev';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandlers());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.get('/', async (req, res) => {
    res.render('pages/home')
})

app.get('/about', async (req, res) => {
    res.render('pages/about')
})
app.listen(port, () => {
    if(IS_DEVELOPMENT) {
        // createPagesInFront();
        // sortCss('./styles/');
    }
    console.log(`Example app listening at http://localhost:${port}`)
})

