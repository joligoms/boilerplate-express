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

 module.exports = app;
