const router = require('express').Router();
const authController = require('../controllers/AuthController');

// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

router.get('/test', (req, res) => {
	setTimeout(() => {
		res.json({ success: true });
	}, 5000);
});

router.post('/register', async (req, res, next) => {
	// const { email, password, firstname, lastname, company, contact } = req.body;
	const origin = req.headers.origin || 'http://localhost:3000';

	req.response = await authController.register(
		req.body,
		origin,
	);

	next();

	// const { result, error } = await authController.register(email, password, first_name, last_name, origin);

	// if (error) {
	// 	res.status(error.status).json({ message: error.message });
	// } else if (result) {
	// 	res.status(result.status).json(result.data);
	// } else {
	// 	res.sendStatus(500);
	// }
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const origin = req.headers.origin || process.env.ALTRUNIC_WEB_ORIGIN;

	const { result, error } = await authController.login(email, password, origin);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.message);
	} else {
		res.sendStatus(500);
	}
});

router.post('/admin_login', async (req, res) => {
	const { result, error } = await authController.adminLogin(req.body);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.message);
	} else {
		res.sendStatus(500);
	}
});

router.post('/guestlogin', async (req, res) => {
	const { tenant_id, email } = req.body;

	const { result, error } = await authController.guestLogin(tenant_id, email);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json({ data: result.message });
	} else {
		res.sendStatus(500);
	}
});

router.post('/refresh', async (req, res) => {
	// const { token } = req.signedCookies;
	// console.log(req.signedCookies, 'COOKIES');

	const { refresh_token } = req.body;

	const { result, error } = await authController.refreshToken(refresh_token);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.message);
	} else {
		res.sendStatus(500);
	}
});

router.post('/logout', async (req, res) => {
	res.clearCookie('token');
	res.status(200).json({ message: 'logged out' });
});

router.post('/resetpassword/request', async (req, res) => {
	const { email } = req.body;
	const origin = req.headers.origin || process.env.ALTRUNIC_WEB_ORIGIN;

	const { result, error } = await authController.requestResetPassword(
		origin,
		email,
	);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json({ message: 'Reset link sent to email' });
	} else {
		res.sendStatus(500);
	}
});

router.patch('/resetpassword', async (req, res) => {
	const { reset_token, password } = req.body;

	const { result, error } = await authController.resetPassword(
		reset_token,
		password,
	);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json({ message: result.message });
	} else {
		res.sendStatus(500);
	}
});

router.post('/activate/request', async (req, res) => {
	const { email } = req.body;
	const origin = req.headers.origin || process.env.ALTRUNIC_WEB_ORIGIN;

	const { result, error } = await authController.requestActivationToken(
		origin,
		email,
	);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res
			.status(result.status)
			.json({ message: 'Activation link sent to your email' });
	} else {
		res.sendStatus(500);
	}
});

router.post('/activate', async (req, res) => {
	const { activation_token } = req.body;

	const { result, error } = await authController.activateUser(activation_token);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(200).json({ message: result.message });
	} else {
		res.sendStatus(500);
	}
});

module.exports = router;
