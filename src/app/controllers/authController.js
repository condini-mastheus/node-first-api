const express = require('express');
const bycrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const authConfig = require('../../config/auth');

const router = express.Router();

// generate token
function generateToken(params = {}) {
	return jwt.sign(
		params,
		authConfig.jwt.SECRET,
		{ expiresIn: authConfig.jwt.EXPIRES },
	);
}

router.post('/register', async (req, res) => {
	const { email } = req.body;

	try {
		if (await User.findOne({ email })) {
			return res.status(400).send({ error: 'User already exits' });
		}

		const user = await User.create(req.body);

		// remove password from user object
		user.password = undefined;

		return res.send({
			user,
			token: generateToken({ id: user.id }),
		});
	} catch (error) {
		return res.status(400).send({ error: 'Registration failed' });
	}
});

router.post('/authenticate', async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email }).select('+password');

		if (!user) {
			return res.status(400).send({ error: 'User not found' });
		}

		if (!await bycrpyt.compare(password, user.password)) {
			return res.status(400).send({ error: 'User invalid credentials' });
		}

		// remove password from user object
		user.password = undefined;

		return res.send({
			user,
			token: generateToken({ id: user.id }),
		});
	} catch (error) {
		return res.status(400).send({ error: 'Authentication failed' });
	}
});

module.exports = app => app.use('/auth', router);
