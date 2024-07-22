// Load environment variables from .env file
const dotenv = require('dotenv');

dotenv.config();

exports.seed = async function (knex) {
	const product = {
		development: {
			id: 'prod_M6CUOiF3Txodl8',
		},
		staging: {
			id: 'prod_M1H3ZrQFthmaLE',
		},
		production: {
			id: 'prod_LS4bhPufBzfu7J',
		},
	};

	try {
		await knex('StripeProduct')
			.insert([
				{
					id: product[process.env.NODE_ENV || 'development'].id,
					name: 'Base',
					is_public: true,
					is_active: true,
				},
			])
			.onConflict('id')
			.ignore();
	} catch (err) {
		console.log(err);
	}
};
