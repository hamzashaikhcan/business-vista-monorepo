exports.seed = async function (knex) {
	// Inserts seed entries
	try {
		await knex('Permission')
			.insert([
				//User object permissions
				{ id: 1, object_name: 'users', action_name: 'CREATE' },
				{ id: 3, object_name: 'users', action_name: 'READ' },
				{ id: 4, object_name: 'users', action_name: 'UPDATE' },
				{ id: 5, object_name: 'users', action_name: 'DELETE' },

				//Tenant object permissions
				{ id: 6, object_name: 'tenants', action_name: 'CREATE' },
				{ id: 8, object_name: 'tenants', action_name: 'READ' },
				{ id: 9, object_name: 'tenants', action_name: 'UPDATE' },
				{ id: 10, object_name: 'tenants', action_name: 'DELETE' },

				//Roles object permission
				{ id: 11, object_name: 'roles', action_name: 'CREATE' },
				{ id: 13, object_name: 'roles', action_name: 'READ' },
				{ id: 14, object_name: 'roles', action_name: 'UPDATE' },
				{ id: 15, object_name: 'roles', action_name: 'DELETE' },

				//user_roles object permission
				{ id: 16, object_name: 'user_roles', action_name: 'CREATE' },
				{ id: 18, object_name: 'user_roles', action_name: 'READ' },
				{ id: 19, object_name: 'user_roles', action_name: 'UPDATE' },
				{ id: 20, object_name: 'user_roles', action_name: 'DELETE' },

				//objects object permission
				{ id: 21, object_name: 'objects', action_name: 'CREATE' },
				{ id: 23, object_name: 'objects', action_name: 'READ' },
				{ id: 24, object_name: 'objects', action_name: 'UPDATE' },
				{ id: 25, object_name: 'objects', action_name: 'DELETE' },

				//permissions object permission
				{ id: 26, object_name: 'permissions', action_name: 'CREATE' },
				{ id: 28, object_name: 'permissions', action_name: 'READ' },
				{ id: 29, object_name: 'permissions', action_name: 'UPDATE' },
				{ id: 30, object_name: 'permissions', action_name: 'DELETE' },

				//permission_assignments object permission
				{
					id: 31,
					object_name: 'permission_assignments',
					action_name: 'CREATE',
				},
				{ id: 33, object_name: 'permission_assignments', action_name: 'READ' },
				{
					id: 34,
					object_name: 'permission_assignments',
					action_name: 'UPDATE',
				},
				{
					id: 35,
					object_name: 'permission_assignments',
					action_name: 'DELETE',
				},

				//subscription object permission
				{ id: 36, object_name: 'subscriptions', action_name: 'CREATE' },
				{ id: 38, object_name: 'subscriptions', action_name: 'READ' },
				{ id: 39, object_name: 'subscriptions', action_name: 'UPDATE' },
				{ id: 40, object_name: 'subscriptions', action_name: 'DELETE' },

				//subscription Packages object permission
				{ id: 41, object_name: 'subscription_packages', action_name: 'CREATE' },
				{ id: 43, object_name: 'subscription_packages', action_name: 'READ' },
				{ id: 44, object_name: 'subscription_packages', action_name: 'UPDATE' },
				{ id: 45, object_name: 'subscription_packages', action_name: 'DELETE' },

				//user_profile object permission
				{ id: 46, object_name: 'user_profiles', action_name: 'CREATE' },
				{ id: 48, object_name: 'user_profiles', action_name: 'READ' },
				{ id: 49, object_name: 'user_profiles', action_name: 'UPDATE' },
				{ id: 50, object_name: 'user_profiles', action_name: 'DELETE' },

				//tenant_profile object permission
				{ id: 51, object_name: 'tenant_profiles', action_name: 'CREATE' },
				{ id: 53, object_name: 'tenant_profiles', action_name: 'READ' },
				{ id: 54, object_name: 'tenant_profiles', action_name: 'UPDATE' },
				{ id: 55, object_name: 'tenant_profiles', action_name: 'DELETE' },

				//notification_sucscriptions object permission
				{
					id: 101,
					object_name: 'notification_subscriptions',
					action_name: 'CREATE',
				},
				{
					id: 103,
					object_name: 'notification_subscriptions',
					action_name: 'READ',
				},
				{
					id: 104,
					object_name: 'notification_subscriptions',
					action_name: 'UPDATE',
				},
				{
					id: 105,
					object_name: 'notification_subscriptions',
					action_name: 'DELETE',
				},

				//notifications object permission
				{ id: 106, object_name: 'notifications', action_name: 'CREATE' },
				{ id: 108, object_name: 'notifications', action_name: 'READ' },
				{ id: 109, object_name: 'notifications', action_name: 'UPDATE' },
				{ id: 110, object_name: 'notifications', action_name: 'DELETE' },

				//stripe_customers object permission
				{ id: 125, object_name: 'stripe_customers', action_name: 'CREATE' },
				{ id: 126, object_name: 'stripe_customers', action_name: 'READ' },
				{ id: 127, object_name: 'stripe_customers', action_name: 'UPDATE' },
				{ id: 128, object_name: 'stripe_customers', action_name: 'DELETE' },

				//teams object permission
				{ id: 129, object_name: 'teams', action_name: 'CREATE' },
				{ id: 130, object_name: 'teams', action_name: 'READ' },
				{ id: 131, object_name: 'teams', action_name: 'UPDATE' },
				{ id: 132, object_name: 'teams', action_name: 'DELETE' },

				//clients object permission
				{ id: 133, object_name: 'clients', action_name: 'CREATE' },
				{ id: 134, object_name: 'clients', action_name: 'READ' },
				{ id: 135, object_name: 'clients', action_name: 'UPDATE' },
				{ id: 136, object_name: 'clients', action_name: 'DELETE' },

				//Workflows object permission
				{ id: 137, object_name: 'workflows', action_name: 'CREATE' },
				{ id: 138, object_name: 'workflows', action_name: 'READ' },
				{ id: 139, object_name: 'workflows', action_name: 'UPDATE' },
				{ id: 140, object_name: 'workflows', action_name: 'DELETE' },

				//tasks object permission
				{ id: 141, object_name: 'tasks', action_name: 'CREATE' },
				{ id: 142, object_name: 'tasks', action_name: 'READ' },
				{ id: 143, object_name: 'tasks', action_name: 'UPDATE' },
				{ id: 144, object_name: 'tasks', action_name: 'DELETE' },

				//task_types object permission
				{ id: 145, object_name: 'task_types', action_name: 'CREATE' },
				{ id: 146, object_name: 'task_types', action_name: 'READ' },
				{ id: 147, object_name: 'task_types', action_name: 'UPDATE' },
				{ id: 148, object_name: 'task_types', action_name: 'DELETE' },

				//client_software_stack object permission
				{
					id: 157,
					object_name: 'client_software_stack',
					action_name: 'CREATE',
				},
				{ id: 158, object_name: 'client_software_stack', action_name: 'READ' },
				{
					id: 159,
					object_name: 'client_software_stack',
					action_name: 'UPDATE',
				},
				{
					id: 160,
					object_name: 'client_software_stack',
					action_name: 'DELETE',
				},

				//workflow_builder object permission
				{ id: 161, object_name: 'workflow_builder', action_name: 'CREATE' },
				{ id: 163, object_name: 'workflow_builder', action_name: 'READ' },
				{ id: 164, object_name: 'workflow_builder', action_name: 'UPDATE' },
				{ id: 165, object_name: 'workflow_builder', action_name: 'DELETE' },
				//User Teams object permission
				{ id: 166, object_name: 'user_teams', action_name: 'CREATE' },
				{ id: 168, object_name: 'user_teams', action_name: 'READ' },
				{ id: 169, object_name: 'user_teams', action_name: 'UPDATE' },
				{ id: 170, object_name: 'user_teams', action_name: 'DELETE' },

				//client_workflow object permission
				{ id: 171, object_name: 'client_workflows', action_name: 'CREATE' },
				{ id: 173, object_name: 'client_workflows', action_name: 'READ' },
				{ id: 174, object_name: 'client_workflows', action_name: 'UPDATE' },
				{ id: 175, object_name: 'client_workflows', action_name: 'DELETE' },

				//workflow_submissions object permission
				{ id: 176, object_name: 'workflow_submissions', action_name: 'CREATE' },
				{ id: 178, object_name: 'workflow_submissions', action_name: 'READ' },
				{ id: 179, object_name: 'workflow_submissions', action_name: 'UPDATE' },
				{ id: 180, object_name: 'workflow_submissions', action_name: 'DELETE' },

				//workflow socket object permission
				{ id: 186, object_name: 'socket', action_name: 'CREATE' },
				{ id: 188, object_name: 'socket', action_name: 'READ' },
				{ id: 189, object_name: 'socket', action_name: 'UPDATE' },
				{ id: 190, object_name: 'socket', action_name: 'DELETE' },

				//workflow comments object permission
				{ id: 191, object_name: 'comments', action_name: 'CREATE' },
				{ id: 193, object_name: 'comments', action_name: 'READ' },
				{ id: 194, object_name: 'comments', action_name: 'UPDATE' },
				{ id: 195, object_name: 'comments', action_name: 'DELETE' },

				//client_workflow_tasks object permission
				{
					id: 196,
					object_name: 'client_workflow_tasks',
					action_name: 'CREATE',
				},
				{ id: 197, object_name: 'client_workflow_tasks', action_name: 'READ' },
				{
					id: 198,
					object_name: 'client_workflow_tasks',
					action_name: 'UPDATE',
				},
				{
					id: 199,
					object_name: 'client_workflow_tasks',
					action_name: 'DELETE',
				},
				//slack object permission
				{ id: 201, object_name: 'slack', action_name: 'CREATE' },
				{ id: 203, object_name: 'slack', action_name: 'READ' },
				{ id: 204, object_name: 'slack', action_name: 'UPDATE' },
				{ id: 205, object_name: 'slack', action_name: 'DELETE' },

				//search object permission
				{ id: 207, object_name: 'search', action_name: 'READ' },
			])
			.onConflict('id')
			.ignore();
	} catch (err) {
		console.log(err);
	}
};
