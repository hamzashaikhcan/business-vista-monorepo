exports.seed = async function (knex) {
	try {
		await knex('User')
			.insert([
				{
					id: 10000,
					email: 'admin@businessvista.com',
					password:
						'$2b$10$VTbog0CdcBb7nJaGMq8TbOTL00fKwCVMGZf6UYeEVJnKuflHH2w/.',
					is_active: true,
				}, //password = admin@#1234
			])
			.onConflict('id')
			.ignore();

		await knex.raw(
			'SELECT setval(\'"User_id_seq"\', (SELECT max(id) from "User"))',
		);
	} catch (err) {
		console.log(err);
	}
};
