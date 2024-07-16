
exports.seed = async function (knex) {
	try {
		await knex('User_Role')
			.insert([
				{ id: 10000, user_id: 10000, tenant_id: 10000, role_id: 11 },
			])
			.onConflict('id')
			.ignore();

		await knex.raw('SELECT setval(\'"User_Role_id_seq"\', (SELECT max(id) from "User_Role"))');
	} catch (err) {
		console.log(err);
	}
};
