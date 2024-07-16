const router = require('express').Router();
const stripeCustomerController = require('../controllers/StripeCustomerController');
// const stripeManager = require('./../utility/StripeManager');

router.post('/attach_payment_method', async (req, res, next) => {

	// const { result, error } = await stripeCustomerController.attachCustomerPaymentMethod(req.user, req.body);
	req.response = await stripeCustomerController.attachCustomerPaymentMethod(req.user, req.body);
	next();

	// if (error) {
	// 	res.status(error.status).json({ message: error.message });
	// } else if (result) {
	// 	res.status(result.status).json(result.data);
	// } else {
	// 	res.sendStatus(500);
	// }

});

router.post('/detach_payment_method', async (req, res, next) => {

	// const { result, error } = await stripeManager.detachCustomerPaymentMethod(req.body);
	// const { result, error } = await stripeCustomerController.detachCustomerPaymentMethod(req.user, req.body);
	req.response = await stripeCustomerController.detachCustomerPaymentMethod(req.user, req.body);
	next();
	// if (error) {
	// 	res.status(error.status).json({ message: error.message });
	// } else if (result) {
	// 	res.status(result.status).json(result.data);
	// } else {
	// 	res.sendStatus(500);
	// }

});

router.get('/list_payment_methods', async (req, res, next) => {

	// const { result, error } = await stripeManager.listCustomerPaymentMethods(req.query);
	// const { result, error } = await stripeCustomerController.listCustomerPaymentMethods(req.user);
	req.response = await stripeCustomerController.listCustomerPaymentMethods(req.user);
	next();

	// if (error) {
	// 	res.status(error.status).json({ message: error.message });
	// } else if (result) {
	// 	res.status(result.status).json(result.data);
	// } else {
	// 	res.sendStatus(500);
	// }

});

router.get('/customer_invoices', async (req, res, next) => {

	// const { result, error } = await stripeManager.listCustomerInvoices(req.query);
	// const { result, error } = await stripeCustomerController.listCustomerInvoices(req.user);
	req.response = await stripeCustomerController.listCustomerInvoices(req.user);
	next();

	// if (error) {
	// 	res.status(error.status).json({ message: error.message });
	// } else if (result) {
	// 	res.status(result.status).json(result.data);
	// } else {
	// 	res.sendStatus(500);
	// }

});

router.get('/upcoming_invoice', async (req, res, next) => {

	// const { result, error } = await stripeManager.getCustomerUpcomingInvoice(req.query);
	// const { result, error } = await stripeCustomerController.getCustomerUpcomingInvoice(req.user);
	req.response = await stripeCustomerController.getCustomerUpcomingInvoice(req.user);
	next();

	// if (error) {
	// 	res.status(error.status).json({ message: error.message });
	// } else if (result) {
	// 	res.status(result.status).json(result.data);
	// } else {
	// 	res.sendStatus(500);
	// }

});

router.post('/retry_invoice', async (req, res, next) => {

	// const { result, error } = await stripeManager.getCustomerUpcomingInvoice(req.query);
	req.response = await stripeCustomerController.retryStripeInvoice(req.user);
	next();
	// if (error) {
	// 	res.status(error.status).json({ message: error.message });
	// } else if (result) {
	// 	res.status(result.status).json(result.data);
	// } else {
	// 	res.sendStatus(500);
	// }

});

router.post('/invoice_proration', async (req, res, next) => {

	// const { result, error } = await stripeManager.getStripeSubscriptionProration(req.socket.remoteAddress, req.query, req.user);
	req.response = await stripeCustomerController.getStripeSubscriptionProration(req.socket.remoteAddress, req.user, req.body);
	next();
	// if (error) {
	// 	res.status(error.status).json({ message: error.message });
	// } else if (result) {
	// 	res.status(result.status).json(result.data);
	// } else {
	// 	res.sendStatus(500);
	// }

});

router.get('/coupon_details/:coupon_id', async (req, res, next) => {

	req.response = await stripeCustomerController.getCouponDetails(req.params);
	next();

	// if (error) {
	// 	res.status(error.status).json({ message: error.message });
	// } else if (result) {
	// 	res.status(result.status).json(result.data);
	// } else {
	// 	res.sendStatus(500);
	// }

});

module.exports = router;
