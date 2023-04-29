let express = require('express');
let app = express();
app.use('/public', express.static(`${__dirname}/public`));

app.get('/', (_, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

app.get('/json', (_, res) => res.json({ message: 'Hello json'}));

 module.exports = app;
