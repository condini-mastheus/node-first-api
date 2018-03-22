const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');

module.exports = async (req, res, next) => {
	const authorization = req.headers.authorization;

	if (!authorization) {
		return res.status(401).send({ error: 'No token provied' });
	}

	const parts = authorization.split(' ');

	if (!parts.lenght === 2) {
		return res.status(400).send({ error: 'Token malformed' });
	}

	const [scheme, token] = parts;

	if (!/^Bearer$/i.test(scheme)) {
		return res.status(400).send({ error: 'Token malformed' });
	}

	await jwt.verify(token, authConfig.jwt.SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).send({ error: 'Token invalid' });
		}

		req.userId = decoded.id;

		return next();
	});
};
