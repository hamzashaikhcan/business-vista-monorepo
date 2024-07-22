
exports.seed = async function (knex) {
	try {
		await knex('Tenant')
			.insert([
				{ id: 10000, onboarding_status: 'COMPLETED' },
			])
			.onConflict('id')
			.ignore();

		await knex.raw('SELECT setval(\'"Tenant_id_seq"\', (SELECT max(id) from "Tenant"))');
	} catch (err) {
		console.log(err);
	}
};
