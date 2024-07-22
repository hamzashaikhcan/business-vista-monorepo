const StripeProduct = require('../database/models/StripeProduct');
const { StatusCode } = require('../utilities/KeyMaster');
const Exceptions = require('../utilities/Exceptions');

module.exports = {

	list: async (user, { expand }) => {

		try {
			const data = await StripeProduct.query().where({ is_public: true }).withGraphFetched(expand).allowGraph('stripe_pricings');

			return { result: { status: StatusCode.SUCCESS, data: data } };

		} catch (err) {
			return { error: Exceptions.getError(err) };
		}

	},

	get: async ({ id }, user, { expand }) => {

		try {
			const data = await StripeProduct.query().findById(id).where({ is_public: true }).withGraphFetched(expand).allowGraph('stripe_pricings')
				.throwIfNotFound({ message: 'Invalid stripe product id' });

			return { result: { status: StatusCode.SUCCESS, data: data } };

		} catch (err) {
			return { error: Exceptions.getError(err) };
		}

	},

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

			const data = await StripeProduct.query().insert({
				id: body.id,
				name: body.name,
				is_public: body.metadata.is_public && (body.metadata.is_public.toLowerCase() === 'true' ? true : false),
				is_active: body.active
			});

			return { result: { status: StatusCode.CREATED, data: data } };

		} catch (err) {
			return { error: Exceptions.getError(err) };
		}

	},

	update: async ({ id }, body) => {

		try {

			const data = await StripeProduct.query()
				.patchAndFetchById(id, {
					name: body.name,
					is_public: body.metadata.is_public && (body.metadata.is_public.toLowerCase() === 'true' ? true : false),
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
			const data = await StripeProduct.query().deleteById(id).throwIfNotFound({ message: 'Invalid stripe product id' });
			return { result: { status: StatusCode.SUCCESS, data: data } };

		} catch (err) {
			return { error: Exceptions.getError(err) };
		}
	}

};