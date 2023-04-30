require('dotenv').config()
const bodyParser = require('body-parser');

let express = require('express');
let app = express();

function logger(req, _, next) {
    const { method, path, ip } = req;

    console.log(`${method} ${path} - ${ip}`);
    next();
}

app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(`${__dirname}/public`));
app.use(logger);


app.get('/', (_, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

app.get('/json', (_, res) => {
    let message = 'Hello json';    
    let messageStyle = process.env.MESSAGE_STYLE;

    res.json({
        message: messageStyle === 'uppercase'
            ? message.toUpperCase()
            : message
    });
});

app.get('/now', (req, _, next) => {
    req.time = new Date().toString();

    next();
}, (req, res) => res.json({time: req.time}));

app.get('/:word/echo', (req, _, next) => {
    req.word = req.params.word;

    next();
}, (req, res) => res.json({echo: req.word}));


const nameMiddleware = (req, res) => res.json({name: `${req.first} ${req.last}`});

app.route('/name')
    .get((req, _, next) => {
        req.first = req.query.first;
        req.last = req.query.last;

        next();
    }, nameMiddleware)
    .post((req, _, next) => {
        req.first = req.body.first;
        req.last = req.body.last;

        next();
    }, nameMiddleware);

 module.exports = app;
