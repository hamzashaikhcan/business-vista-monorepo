const { validateToken } = require('./Authentication');
const { StatusCode } = require('./KeyMaster');
const StripeManager = require('./StripeManager');
// Load environment variables from .env file
const dotenv = require('dotenv');

dotenv.config();

//Allow Cross-origin resource sharing
exports.crossOriginResource = async function (req, res, next) {

	// console.log(req.headers, 'HEADERS');

	// Website you wish to allow to connect
	if (req.headers.origin) {
		res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	}

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow	
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, sentry-trace, content-type, authorization, accept');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	if (req.method === 'OPTIONS') {
		res.sendStatus(StatusCode.SUCCESS);
	} else {
		next();
	}

};

exports.authenticateToken = function (req, res, next) {
	
	const authorizationHeader = req.headers['authorization'];

	const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];

	if (!accessToken) {
		return res.sendStatus(StatusCode.UNAUTHORIZED);
	}
	
	try {
		const tokenData = validateToken(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
		req.user = tokenData.user;
		next();

	} catch (err) {
		res.sendStatus(StatusCode.FORBIDDEN);
	}

};

exports.stripeWebhookCheck = function (req, res, next) {

	const sig = req.headers['stripe-signature'];

	try {

		// console.log(req.body, '==\n==', req.rawBody);
		// req.event = stripe.webhooks.constructEvent(
		req.event = StripeManager.stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);

		next();
	} catch (err) {
		res.status(400).send(`Webhook Error: ${err.message}`);
	}

};

exports.parseUser = function (req, res, next) {

	const userHeader = req.headers['user'];
	try {

		if (!userHeader) {
			throw new Error('Invalid user headers');
		}

		req.user = JSON.parse(userHeader);

		next();

	} catch (err) {
		res.status(StatusCode.UNAUTHORIZED).json({ message: err.message });
	}

};

/**
 * @param {Object} req
 * @param {Object} req.response
 * @param {Object} req.response.error
 * @param {Object} req.response.error.status
 * @param {Object} req.response.error.message
 * @param {Object} req.response.result
 * @param {Object} req.response.result.status
 * @param {Object} req.response.result.data
 * @param {Object} req.response.result.event_name
 * @param {Object} req.response.result.sensitive_data
 */
exports.sendResponse = function (req, res) {

	if (!req.response) {
		res.sendStatus(StatusCode.FORBIDDEN);
	}

	const { result, error } = req.response;

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {

		if (result.event_name) {
			console.log(result.event_name);
		}

		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(StatusCode.INTERNAL_SERVER_ERROR);
	}

};

// /**
//  * @param {Object} req
//  * @param {Object} req.response
//  * @param {Object} req.response.error
//  * @param {Object} req.response.error.status
//  * @param {Object} req.response.error.message
//  * @param {Object} req.response.result
//  * @param {Object} req.response.result.status
//  * @param {Object} req.response.result.data
//  * @param {Array} req.response.result.stream_events
//  * @param {Object} req.response.result.stream_data
//  * @param {Array} req.response.result.sensitive_events
//  * @param {Object} req.response.result.sensitive_data
//  */
// exports.sendSensitiveResponse = function (req, res) {

// 	if (!req.response) {
// 		res.sendStatus(StatusCode.FORBIDDEN);
// 	}

// 	const { result, error } = req.response;

// 	if (error) {
// 		res.status(error.status).json({ message: error.message });

// 	} else if (result) {

// 		if (result.stream_events && result.stream_events.length > 0) {
// 			console.log('Stream Events ->', result.stream_events);
// 			console.log('Stream Data ->', result.stream_data);
// 		}

// 		if (result.sensitive_events && result.sensitive_events.length > 0) {
// 			console.log('Sensitive Events ->', result.sensitive_events);
// 			console.log('Sensitive Data ->', result.sensitive_data);
// 		}

// 		res.status(result.status).json(result.data);

// 	} else {
// 		res.sendStatus(StatusCode.INTERNAL_SERVER_ERROR);
// 	}

// };