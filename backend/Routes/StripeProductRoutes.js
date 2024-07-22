const router = require('express').Router();
const subscriptionProductController = require('../controllers/StripeProductController');

router.get('/', async (req, res) => {

	const { result, error } = await subscriptionProductController.list(req.user, req.query);

	if (error) {
		res.status(error.status).json(error.message);
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}
});

router.get('/:id', async (req, res) => {

	const { result, error } = await subscriptionProductController.get(req.params, req.user, req.query);

	if (error) {
		res.status(error.status).json(error.message);
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}
});

module.exports = router;
