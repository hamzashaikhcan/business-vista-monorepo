
exports.seed = async function (knex) {

	try {

		await knex('Role').insert([
			{ id: 11, role_name: 'Super Admin' },
			{ id: 12, role_name: 'Admin' },
			{ id: 13, role_name: 'BD' },
			{ id: 14, role_name: 'Dev' },
		]).onConflict('role_name').ignore();

		await knex.raw('SELECT setval(\'"Role_id_seq"\', (SELECT max(id) from "Role"))');

	} catch (err) {
		console.log(err);
	}

};
