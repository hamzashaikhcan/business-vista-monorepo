const router = require('express').Router();
// const stripeManager = require('../utility/StripeManager');
const subscriptionController = require('../controllers/SubscriptionController');

router.get('/', async (req, res) => {

	const { result, error } = await subscriptionController.list(req.user, req.query);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}
});

router.get('/:id', async (req, res) => {

	const { result, error } = await subscriptionController.get(req.params, req.user, req.query);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}
});

router.post('/', async (req, res) => {
	// const { result, error } = await stripeManager.createStripeSubscription(
	// 	req.body,
	// 	req.user,
	// );

	const { result, error } = await subscriptionController.create(req.user, req.body);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}
});

router.patch('/:id', async (req, res) => {
	// const { result, error } = await stripeManager.updateStripeSubscription(
	// 	req.params.id,
	// 	req.body,
	// );

	const { result, error } = await subscriptionController.update(req.params, req.user, req.body);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}
});

router.delete('/:id', async (req, res) => {
	// const { result, error } = await subscriptionController.deleteSubscription(
	// 	req.params.id,
	// );

	const { error, result } = await subscriptionController.delete(req.params, req.user);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}
});

module.exports = router;
