require('dotenv').config()

let express = require('express');
let app = express();
app.use('/public', express.static(`${__dirname}/public`));

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
