const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./app/controllers/');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<code>Version: 1.0.0</code>');
});

controllers(app);

app.listen(port);
