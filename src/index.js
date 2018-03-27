const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./app/controllers/');
const helmet = require('helmet');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use(helmet());

app.get('/', (req, res) => {
	res.send('<code>Version: 1.0.0</code>');
});

controllers(app);

app.listen(port);
