const { Stripe } = require('stripe');

// Load environment variables from .env file
const dotenv = require('dotenv');

dotenv.config();

// const StripePricing = require('../database/models/StripePricing');
// const Subscription = require('../database/models/Subscription');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 *
 * @param {Object} body body data object
 * @param {Object} user user object
 * @param {String} body.name customer Name
 * @param {Number} body.package_id customer Name
 * @param {Number} user.tenant_id Tenant ID
 * @param {String} user.email customer email adrress
 * @returns
 */

module.exports = {

	stripe: stripe,

	createStripeSubscription: async ({ stripe_customer_id, stripe_pricing_id, coupon, tenant_id, trial_days = 0 }) => {

		try {

			// const customer = await stripe.customers.create({
			// 	email: email,
			// 	payment_method: payment_method_id,
			// 	name: name_on_card,
			// 	metadata: {
			// 		tenant_id: tenant_id,
			// 	},
			// 	invoice_settings: {
			// 		default_payment_method: payment_method_id,
			// 	},
			// });

			const subscription = await stripe.subscriptions.create({
				customer: stripe_customer_id,
				items: [{ price: stripe_pricing_id }],
				coupon,
				metadata: {
					tenant_id: tenant_id,
				},
				trial_end: Math.floor(Date.now() / 1000) + trial_days * 24 * 3600,
				payment_behavior: 'error_if_incomplete',
				expand: ['latest_invoice.payment_intent'],
			});

			return { subscription };

		} catch (error) {
			return { error };
		}
	},

	updateStripeSubscription: async function ({ stripe_subscription_id, stripe_pricing_id }) {

		try {

			const subscription = await stripe.subscriptions.retrieve(stripe_subscription_id);

			const updatedSubscription = await stripe.subscriptions.update(stripe_subscription_id, {
				cancel_at_period_end: false,
				proration_behavior: 'always_invoice',
				items: [
					{
						id: subscription.items.data[0].id,
						price: stripe_pricing_id,
					},
				]
			},
			);


			return { subscription: updatedSubscription };
		} catch (error) {
			return { error };
		}
	},

	cancelStripeSubscription: async (stripe_subscription_id) => {

		try {

			const subscription = await stripe.subscriptions.update(stripe_subscription_id, { cancel_at_period_end: true });
			return { subscription };

		} catch (error) {
			return { error };
		}

	},

	updateUsage: async (stripe_subscription_id, quantity) => {

		try {

			const subscription = await stripe.subscriptions.retrieve(stripe_subscription_id);

			const usageRecord = await stripe.subscriptionItems.createUsageRecord(
				subscription.items.data[0].id, //There is only supposed to be one subscription item
				{
					quantity,
					timestamp: 'now', //POSIX timestamp
					action: 'set',
				},
			);

			return { usageRecord };
		} catch (error) {
			return { error };
		}

	},

	createStripeCustomer: async ({ name_on_card, email, payment_method_id, tenant_id }) => {

		try {
			const customer = await stripe.customers.create({
				email: email,
				payment_method: payment_method_id,
				name: name_on_card,
				metadata: {
					tenant_id: tenant_id,
				},
				invoice_settings: {
					default_payment_method: payment_method_id,
				},
			});

			return { customer };

		} catch (error) {
			return { error };
		}

	},

	deleteStripeCutomer: async (stripe_customer_id) => {

		try {

			const customer = await stripe.customers.del(stripe_customer_id);

			return { customer };

		} catch (error) {
			return { error };
		}
	},

	listCustomerInvoices: async (stripe_customer_id) => {

		try {

			const invoices = await stripe.invoices.list({ customer: stripe_customer_id });

			return { invoices };

		} catch (error) {
			return { error };
		}

	},

	getCustomerUpcomingInvoice: async (stripe_customer_id) => {

		try {

			const invoice = await stripe.invoices.retrieveUpcoming({ customer: stripe_customer_id });

			return { invoice };

		} catch (error) {
			return { error };
		}

	},

	retryStripeInvoice: async (stripe_customer_id) => {

		try {

			const invoices = await stripe.invoices.list({ customer: stripe_customer_id, status: 'open' });

			if (invoices.data.length < 1) {
				throw new Error('No pending invoice');
			}

			const invoice = await stripe.invoices.pay(invoices.data[0].id);

			return { invoice };

		} catch (error) {
			return { error };
		}

	},

	getStripeSubscriptionProration: async (ip_address, stripe_customer_id, stripe_subscription_id, { stripe_pricing_id, coupon }, trial_period_days = 0) => {

		try {


			if ((stripe_customer_id && !stripe_subscription_id) || (stripe_subscription_id && !stripe_customer_id)) {
				throw new Error('For existing customer both customer id and subscription id is required');
			}

			let isOldCustomer = (stripe_customer_id && stripe_subscription_id) ? true : false;

			var options = {
				customer_details: {
					tax: {
						ip_address
					}
				},
				subscription_items: [
					{ price: stripe_pricing_id }
				],
				...(trial_period_days > 0 ? { subscription_trial_end: Math.floor(Date.now() / 1000) + (trial_period_days * 24 * 3600) } : null),
				expand: ['subscription'],
				coupon: coupon
			};

			if (isOldCustomer) {

				const stripe_subscription = await stripe.subscriptions.retrieve(stripe_subscription_id);

				options = {
					customer: stripe_customer_id,
					subscription: stripe_subscription_id,
					subscription_items: [
						{
							id: stripe_subscription.items.data[0].id,
							price: stripe_pricing_id
						}
					],
					subscription_proration_behavior: 'always_invoice',
					expand: ['subscription'],
					coupon: coupon
				};
			}
			// else {
			// 	options = {
			// 		customer_details: {
			// 			tax: {
			// 				ip_address
			// 			}
			// 		},
			// 		subscription_items: [
			// 			{ price: stripe_pricing_id }
			// 		],
			// 		subscription_trial_end: Math.floor(Date.now() / 1000) + (stripePricing.trial_period_days * 24 * 3600),
			// 		expand: ['subscription'],
			// 		coupon: coupon
			// 	};
			// }

			const invoice = await stripe.invoices.retrieveUpcoming(options);

			return { invoice };

		} catch (error) {
			return { error };
		}
	},


	createPaymentMethod: async () => {

		try {

			const paymentMethod = await stripe.paymentMethods.create({
				type: 'card',
				card: {
					number: '4242424242424242',
					exp_month: 6,
					exp_year: 2030,
					cvc: 123,
				}
			});

			return { paymentMethod };

		} catch (error) {
			return { error };
		}

	},

	attachCustomerPaymentMethod: async (stripe_customer_id, { payment_method_id, make_default_payment_method }) => {

		try {

			const paymentMethod = await stripe.paymentMethods.attach(payment_method_id, {
				customer: stripe_customer_id,
			});

			// if (make_default_payment_method) {

			const defaultPaymentMethod = make_default_payment_method ? (await stripe.customers.update(stripe_customer_id, {
				invoice_settings: {
					default_payment_method: payment_method_id,
				}
			})) : (null);

			// }

			return { paymentMethod, defaultPaymentMethod };

		} catch (error) {
			return { error };
		}

	},

	detachCustomerPaymentMethod: async ({ payment_method_id }) => {

		try {
			const paymentMethod = await stripe.paymentMethods.detach(payment_method_id);

			return { paymentMethod };

		} catch (error) {
			return { error };
		}

	},

	listCustomerPaymentMethods: async (stripe_customer_id) => {

		try {

			const paymentMethods = await stripe.paymentMethods.list({
				customer: stripe_customer_id,
				type: 'card',
				expand: ['data.customer'],
			});

			return { paymentMethods };

		} catch (error) {
			return { error };
		}

	},

	getCouponDetails: async (coupon_id) => {

		try {

			const coupon = await stripe.coupons.retrieve(coupon_id);

			return { coupon };

		} catch (error) {
			return { error };
		}

	}
};