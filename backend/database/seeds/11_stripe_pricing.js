// Load environment variables from .env file
const dotenv = require('dotenv');

dotenv.config();

exports.seed = async function (knex) {
	const pricing = {
		development: {
			id: 'price_1LO05HAyXQIqWcsjca5QrMkq',
			stripe_product_id: 'prod_M6CUOiF3Txodl8',
		},
		staging: {
			id: 'price_1LJEV6J7pxvODI5pEyCmKR8x',
			stripe_product_id: 'prod_M1H3ZrQFthmaLE',
		},
		production: {
			id: 'price_1KlASTJ7pxvODI5pSEiPFFTf',
			stripe_product_id: 'prod_LS4bhPufBzfu7J',
		},
	};

	try {
		await knex('StripePricing')
			.insert([
				{
					id: pricing[process.env.NODE_ENV || 'development'].id,
					stripe_product_id:
						pricing[process.env.NODE_ENV || 'development'].stripe_product_id,
					group_key: 'base_first',
					price_per_unit: 10,
					is_recurring: true,
					interval: 'month',
					trial_period_days: null,
					allowed_users: null,
					payment_threshold: null,
					alert_threshold: null,
					is_active: true,
				},
			])
			.onConflict('id')
			.ignore();
	} catch (err) {
		console.log(err);
	}
};
