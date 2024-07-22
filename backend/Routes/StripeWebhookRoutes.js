const subscriptionController = require('../controllers/SubscriptionController');
const {stripeProductController, stripePriceController} = require('../controllers');
const { retrieveStripeSubscription } = require('../utilities/StripeManager');

const router = require('express').Router();

router.post('/', async (req, res) => {

	const eventType = req.event.type;
	const data = req.event.data;

	var response;

	switch (eventType) {
		case 'customer.subscription.created':
			response = await subscriptionController.updateSubscriptionWithStripeId(
				data.object.id,
				{
					status: data.object.status,
					expires_at: data.object.current_period_end,
				},
			);

			break;
		case 'customer.subscription.deleted':
			response = await subscriptionController.updateSubscriptionWithStripeId(
				data.object.id,
				{ status: data.object.status },
			);
			break;
		case 'customer.subscription.updated':
			response = await subscriptionController.updateSubscriptionWithStripeId(
				data.object.id,
				{
					package_id: Number(data.object.metadata.package_id),
					status: data.object.status,
					expires_at: data.object.current_period_end,
				},
			);
			break;
		case 'invoice.paid':
			var subscription = await retrieveStripeSubscription(
				data.object.subscription,
			);
			if (subscription.error) {
				response = subscription;
				break;
			}
			response = await subscriptionController.updateSubscriptionWithStripeId(
				data.object.subscription,
				{
					status: subscription.result.data.status,
					expires_at: subscription.result.data.current_period_end,
				},
			);

			break;

		case 'product.created':
			response = await stripeProductController.create(data.object);
			break;
		case 'product.updated':
			response = await stripeProductController.update({ id: data.object.id }, data.object);
			break;
		case 'product.deleted':
			response = await stripeProductController.delete({ id: data.object.id });
			break;
		
		case 'price.created':
			response = await stripePriceController.create(data.object);
			break;
		case 'price.updated':
			response = await stripePriceController.update({ id: data.object.id }, data.object);
			break;
		case 'price.deleted':
			response = await stripePriceController.delete({ id: data.object.id });
			break;

		default:
			response = { error: { status: 400, message: 'Bad Request' } };
			break;
	}

	const { result, error } = response;

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json({ data: result.data });
	} else {
		res.sendStatus(500);
	}

});

router.get('/', async (req, res) => {
	res.json({ success: true });
});

module.exports = router;