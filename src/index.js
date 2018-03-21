const express = require('express');
const controllers = require('./app/controllers/');

const app = express();

const port = process.env.PORT || 3000;

controllers(app);

app.listen(port);
