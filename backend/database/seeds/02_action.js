
exports.seed = async function (knex) {

	try {
		await knex('Action').insert([
			{ id: 1, name: 'CREATE' },
			{ id: 2, name: 'READ' },
			{ id: 3, name: 'UPDATE' },
			{ id: 4, name: 'DELETE' },
		]).onConflict('name').ignore();
	
	} catch (err) {
		console.log(err);
	}

};
