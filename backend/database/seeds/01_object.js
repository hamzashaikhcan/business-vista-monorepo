/**
 *
 * @param {import ('knex').Knex} knex
 */
exports.seed = async function (knex) {
	try {
		await knex('Object')
			.insert([
				{ id: 1, name: 'users' },
				{ id: 2, name: 'tenants' },
				{ id: 3, name: 'roles' },
				{ id: 4, name: 'user_roles' },
				{ id: 5, name: 'objects' },
				{ id: 6, name: 'permissions' },
				{ id: 7, name: 'permission_assignments' },
				{ id: 8, name: 'subscriptions' },
				{ id: 9, name: 'subscription_packages' },
				{ id: 10, name: 'user_profiles' },
				{ id: 11, name: 'tenant_profiles' },
				{ id: 12, name: 'notification_subscriptions' },
				{ id: 13, name: 'notifications' },
				{ id: 14, name: 'stripe_customers' },
				{ id: 15, name: 'teams' },
				{ id: 16, name: 'clients' },
				{ id: 17, name: 'workflows' },
				{ id: 18, name: 'tasks' },
				{ id: 19, name: 'task_types' },
				{ id: 22, name: 'client_software_stack' },
				{ id: 23, name: 'workflow_builder' }, //for mongoDB routes create workflows
				{ id: 24, name: 'user_teams' },
				{ id: 25, name: 'client_workflows' },
				{ id: 26, name: 'workflow_submissions' },
				{ id: 28, name: 'socket' },
				{ id: 29, name: 'comments' },
				{ id: 30, name: 'client_workflow_tasks' },
				{ id: 31, name: 'slack' },
				{ id: 32, name: 'search' },
			])
			.onConflict('id')
			.merge()
			.returning('*');
	} catch (err) {
		console.log(err);
	}
};
