require('dotenv').config()

let express = require('express');
let app = express();

app.use('/public', express.static(`${__dirname}/public`));

function logger(req, _, next) {
    const { method, path, ip } = req;

    console.log(`${method} ${path} - ${ip}`);
    next();
}

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
}, (req, res) => res.json({ time: req.time}));

app.get('/:word/echo', (req, _, next) => {
    req.word = req.params.word;

    next();
}, (req, res) => res.json({ echo: req.word}));

app.route('/name')
    .get((req, res) => {
        const { first, last } = req.query;

        res.json({
            name: `${first} ${last}`
        });
    })

 module.exports = app;
