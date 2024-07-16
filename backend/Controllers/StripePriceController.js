const StripePricing = require('../database/models/StripePricing');
const { StatusCode } = require('../utilities/KeyMaster');
const Exceptions = require('../utilities/Exceptions');

module.exports = {
	/**
	 * 
	 * @param {*} user 
	 * @param {object} body 
	 * @param {string} body.id
	 * @param {string} body.name
	 * @param {number} body.allowed_users
	 * @param {number} body.allowed_integrations
	 * @param {boolean} body.is_public
	 * @param {boolean} body.is_active
	 * @returns 
	 */
	create: async (body) => {

		try {

			const data = await StripePricing.query().insert({
				id: body.id,
				stripe_product_id: body.product,
				group_key: body.metadata.group_key ? body.metadata.group_key : body.product,
				price_per_unit: body.unit_amount / 100,
				is_recurring: body.recurring ? true : false,
				interval: body.recurring ? body.recurring.interval : null,
				...(body.metadata.trial_period_days ? { trial_period_days: Number(body.metadata.trial_period_days) } : null),
				allowed_users: Number(body.metadata.allowed_users || null),
				payment_threshold: Number(body.metadata.allowed_integrations || null),
				alert_threshold: Number(body.metadata.allowed_integrations || null),
				is_active: body.active
			});

			return { result: { status: StatusCode.CREATED, data: data } };

		} catch (err) {
			return { error: Exceptions.getError(err) };
		}

	},

	update: async ({ id }, body) => {

		try {
			const data = await StripePricing.query()
				.patchAndFetchById(id, {
					group_key: body.metadata.group_key ? body.metadata.group_key : body.product,
					price_per_unit: body.unit_amount / 100,
					is_recurring: body.recurring ? true : false,
					interval: body.recurring ? body.recurring.interval : null,
					...(body.metadata.trial_period_days ? { trial_period_days: Number(body.metadata.trial_period_days) } : null),
					allowed_users: Number(body.metadata.allowed_users || null),
					payment_threshold: Number(body.metadata.allowed_integrations || null),
					alert_threshold: Number(body.metadata.allowed_integrations || null),
					is_active: body.active
				})
				.throwIfNotFound({ message: 'Invalid stripe product id' });
			return { result: { status: StatusCode.SUCCESS, data: data } };

		} catch (err) {
			return { error: Exceptions.getError(err) };
		}

	},

	delete: async ({ id }) => {
		try {
			const data = await StripePricing.query().deleteById(id).throwIfNotFound({ message: 'Invalid stripe product id' });
			return { result: { status: StatusCode.SUCCESS, data: data } };

		} catch (err) {
			return { error: Exceptions.getError(err) };
		}
	}

};