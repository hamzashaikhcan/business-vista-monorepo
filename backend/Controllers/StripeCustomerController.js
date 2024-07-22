const StripeManager = require('./../utilities/StripeManager');
const { StatusCode } = require('../utilities/KeyMaster');
const Exceptions = require('../utilities/Exceptions');
const Subscription = require('../database/models/Subscription');
const StripePricing = require('../database/models/StripePricing');

module.exports = {

	createPaymentMethod: async () => {

		try {

			const { paymentMethod } = await StripeManager.createPaymentMethod();

			return { result: { status: StatusCode.CREATED, data: paymentMethod } };

		} catch (err) {
			return { error: Exceptions.getError(err) };
		}

	},

	attachCustomerPaymentMethod: async (user, body) => {

		try {

			const subscription = await Subscription.query().findOne({ tenant_id: user.tenant_id }).throwIfNotFound();

			const { paymentMethod, defaultPaymentMethod, error } = await StripeManager.attachCustomerPaymentMethod(subscription.stripe_customer_id, body);

			if (error) throw { name: 'BadRequestError', message: error.message };

			return { result: { status: StatusCode.SUCCESS, data: { paymentMethod, defaultPaymentMethod } } };

		} catch (err) {
			return { error: Exceptions.getError(err) };
		}

	},

	detachCustomerPaymentMethod: async (user, body) => {

		try {

			const { paymentMethod, error } = await StripeManager.detachCustomerPaymentMethod(body);

			if (error) throw { name: 'BadRequestError', message: error.message };

			return { result: { status: StatusCode.SUCCESS, data: paymentMethod } };

		} catch (err) {
			return { error: Exceptions.getError(err) };
		}

	},


	listCustomerPaymentMethods: async (user) => {

		try {

			const subscription = await Subscription.query().findOne({ tenant_id: user.tenant_id }).throwIfNotFound();

			const { paymentMethods, error } = await StripeManager.listCustomerPaymentMethods(subscription.stripe_customer_id);

			if (error) throw { name: 'BadRequestError', message: error.message };

			return { result: { status: StatusCode.CREATED, data: paymentMethods } };

		} catch (err) {
			return { error: Exceptions.getError(err) };
		}

	},

	listCustomerInvoices: async (user) => {

		try {

			const subscription = await Subscription.query().findOne({ tenant_id: user.tenant_id }).throwIfNotFound();

			const { invoices, error } = await StripeManager.listCustomerInvoices(subscription.stripe_customer_id);

			if (error) throw { name: 'BadRequestError', message: error.message };

			return { result: { status: StatusCode.SUCCESS, data: invoices } };

		} catch (err) {
			return { error: Exceptions.getError(err) };
		}

	},

	getCustomerUpcomingInvoice: async (user) => {
		try {

			const subscription = await Subscription.query().findOne({ tenant_id: user.tenant_id }).throwIfNotFound();

			const { invoice, error } = await StripeManager.getCustomerUpcomingInvoice(subscription.stripe_customer_id);

			if (error) throw { name: 'BadRequestError', message: error.message };

			return { result: { status: StatusCode.SUCCESS, data: invoice } };

		} catch (err) {
			return { error: Exceptions.getError(err) };
		}
	},

	retryStripeInvoice: async (user) => {
		try {

			const subscription = await Subscription.query().findOne({ tenant_id: user.tenant_id }).throwIfNotFound();

			const { invoice, error } = await StripeManager.retryStripeInvoice(subscription.stripe_customer_id);

			if (error) throw { name: 'BadRequestError', message: error.message };

			return { result: { status: StatusCode.SUCCESS, data: invoice } };

		} catch (err) {
			return { error: Exceptions.getError(err) };
		}
	},

	getStripeSubscriptionProration: async (remoteAddress, user, body) => {
		try {

			const subscription = await Subscription.query().findOne({ tenant_id: user.tenant_id });
			const stripePricing = await StripePricing.query().findOne({ id: body.stripe_pricing_id }).throwIfNotFound();

			const { invoice, error } = await StripeManager.getStripeSubscriptionProration(
				remoteAddress,
				subscription ? subscription.stripe_customer_id : null,
				subscription ? subscription.stripe_subscription_id : null,
				body,
				stripePricing.trial_period_days
			);

			if (error) throw { name: 'BadRequestError', message: error.message };

			return { result: { status: StatusCode.SUCCESS, data: invoice } };

		} catch (err) {
			return { error: Exceptions.getError(err) };
		}
	},

	getCouponDetails: async ({ coupon_id }) => {
		try {

			const { coupon, error } = await StripeManager.getCouponDetails(coupon_id);

			if (error) throw { name: 'BadRequestError', message: error.message };

			return { result: { status: StatusCode.SUCCESS, data: coupon } };

		} catch (err) {
			return { error: Exceptions.getError(err) };
		}
	},
};