const StripePricing = require('../database/models/StripePricing');
const { StatusCode, KafkaKeys } = require('../utilities/KeyMaster');
const StripeManager = require('../utilities/StripeManager');
const Subscription = require('../database/models/Subscription');
const Exceptions = require('./../utilities/Exceptions');

module.exports = {
	list: async (user, { expand }) => {
		try {
			const data = await Subscription.query()
				.where({ tenant_id: user.tenant_id })
				.withGraphFetched(expand)
				.throwIfNotFound({ message: 'No subscriptoin found' });

			return { result: { status: StatusCode.SUCCESS, data: data } };
		} catch (err) {
			return { error: Exceptions.getError(err) };
		}
	},

	get: async ({ id }, user, { expand }) => {
		try {
			const data = await Subscription.query()
				.findById(id)
				.where({ tenant_id: user.tenant_id })
				.withGraphFetched(expand)
				.throwIfNotFound({ message: 'Invalid subscription id' });

			return { result: { status: StatusCode.SUCCESS, data: data } };
		} catch (err) {
			return { error: Exceptions.getError(err) };
		}
	},

	create: async (user, body) => {
		try {
			// const { name_on_card, stripe_pricing_id, payment_method_id, coupon } = body;

			const existingSubscription = await Subscription.query().findOne({
				tenant_id: user.tenant_id,
			});

			if (existingSubscription) {
				throw { name: 'BadRequestError', message: 'Already subscribed' };
			}

			/**
			 * Validate stripe pricing id
			 */
			const stripePricing = await StripePricing.query()
				.findById(body.stripe_pricing_id)
				.where({ is_active: true })
				.throwIfNotFound({ message: 'Invalid pricing id' });

			/**
			 * Create stripe customer
			 */
			const createCustomer = await StripeManager.createStripeCustomer({
				name_on_card: body.name_on_card,
				email: user.email,
				payment_method_id: body.payment_method_id,
				tenant_id: user.tenant_id,
			});

			if (createCustomer.error)
				throw {
					name: 'BadRequestError',
					message: createCustomer.error.message,
				};

			/**
			 * Create stripe subscription
			 */
			const { subscription, error } =
				await StripeManager.createStripeSubscription({
					stripe_customer_id: createCustomer.customer.id,
					// name_on_card: body.name_on_card,
					stripe_pricing_id: body.stripe_pricing_id,
					// payment_method_id: body.payment_method_id,
					coupon: body.coupon,
					tenant_id: user.tenant_id,
					// email: user.email,
					...(stripePricing.trial_period_days && { trial_days: stripePricing.trial_period_days })
					// trial_days: stripePricing.trial_period_days,
				});

			

			if (error) {
				await StripeManager.deleteStripeCutomer(createCustomer.customer.id);
				throw { name: 'BadRequestError', message: error.message };
			}

			// subscriptionData.stripe_subscription_id = subscription.id;
			// subscriptionData.expires_at = subscription.current_period_end;
			// subscriptionData.status = subscription.status;

			// const data = await Subscription.query().insert(subscriptionData);

			const data = await Subscription.query().insert({
				stripe_pricing_id: body.stripe_pricing_id,
				status: subscription.status,
				tenant_id: user.tenant_id,
				stripe_customer_id: createCustomer.customer.id,
				stripe_subscription_id: subscription.id,
				expires_at: subscription.current_period_end,
			});

			return {
				result: {
					status: StatusCode.CREATED,
					data: { ...data, customer: createCustomer.customer, subscription },
				},
			};
		} catch (err) {
			return { error: Exceptions.getError(err) };
		}
	},

	update: async ({ id }, user, body) => {
		try {
			const existingSubscription = await Subscription.query()
				.findById(id)
				.where({ tenant_id: user.tenant_id })
				.throwIfNotFound({ message: 'Invalid subscription id' });

			const { subscription, error } =
				await StripeManager.updateStripeSubscription({
					stripe_subscription_id: existingSubscription.stripe_subscription_id,
					stripe_pricing_id: body.stripe_pricing_id,
				});

			if (error) {
				throw { name: 'BadRequestError', message: error.message };
			}

			const data = await Subscription.query()
				.patchAndFetchById(id, {
					stripe_pricing_id: body.stripe_pricing_id,
					status: subscription.status,
					expires_at: subscription.current_period_end,
				})
				.throwIfNotFound();

			return { result: { status: StatusCode.SUCCESS, data: data } };
		} catch (err) {
			return { error: Exceptions.getError(err) };
		}
	},

	delete: async ({ id }, user) => {
		try {
			const existingSubscription = await Subscription.query()
				.findById(id)
				.where({ tenant_id: user.tenant_id })
				.throwIfNotFound({ message: 'Invalid subscription id' });

			const { subscription, error } =
				await StripeManager.cancelStripeSubscription(
					existingSubscription.stripe_subscription_id,
				);

			if (error) throw { name: 'BadRequestError', message: error.message };

			return { result: { status: StatusCode.SUCCESS, data: subscription } };
		} catch (err) {
			return { error: Exceptions.getError(err) };
		}
	},
};
