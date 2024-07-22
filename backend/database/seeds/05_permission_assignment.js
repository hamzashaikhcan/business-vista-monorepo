exports.seed = async function (knex) {
	try {
		await knex('Permission_Assignment')
			.insert([
				/*****************************************
				 * Permission assignment for Super Admin *
				 *****************************************/

				//users object permisssions assignment for super admin
				{ role_id: 11, permission_id: 1 },
				{ role_id: 11, permission_id: 3 },
				{ role_id: 11, permission_id: 4 },
				{ role_id: 11, permission_id: 5 },

				//Tenants object permission assignment for super admin
				{ role_id: 11, permission_id: 6 },
				{ role_id: 11, permission_id: 8 },
				{ role_id: 11, permission_id: 9 },
				{ role_id: 11, permission_id: 10 },

				//Roles object permission assignment for super admin
				{ role_id: 11, permission_id: 11 },
				{ role_id: 11, permission_id: 13 },
				{ role_id: 11, permission_id: 14 },
				{ role_id: 11, permission_id: 15 },

				{ role_id: 12, permission_id: 13 },

				{ role_id: 13, permission_id: 13 },

				{ role_id: 14, permission_id: 13 },

				//Role Assignments object permission assignment for super admin
				{ role_id: 11, permission_id: 16 },
				{ role_id: 11, permission_id: 18 },
				{ role_id: 11, permission_id: 19 },
				{ role_id: 11, permission_id: 20 },

				//Objects object permission assignment for super admin
				{ role_id: 11, permission_id: 21 },
				{ role_id: 11, permission_id: 23 },
				{ role_id: 11, permission_id: 24 },
				{ role_id: 11, permission_id: 25 },

				//Permissions object permission assignment for super admin
				{ role_id: 11, permission_id: 26 },
				{ role_id: 11, permission_id: 28 },
				{ role_id: 11, permission_id: 29 },
				{ role_id: 11, permission_id: 30 },

				//Permission Assignments object permission assignment for super admin
				{ role_id: 11, permission_id: 31 },
				{ role_id: 11, permission_id: 33 },
				{ role_id: 11, permission_id: 34 },
				{ role_id: 11, permission_id: 35 },

				//Subscriptions object permission assignment for super admin
				// { role_id: 11, permission_id: 36 },
				// { role_id: 11, permission_id: 38 },
				// { role_id: 11, permission_id: 39 },
				// { role_id: 11, permission_id: 40 },

				//Subscriptions Packages object permission assignment for super admin
				{ role_id: 11, permission_id: 41 },
				{ role_id: 11, permission_id: 43 },
				{ role_id: 11, permission_id: 44 },
				{ role_id: 11, permission_id: 45 },

				//User Profiles object permission assignment for super admin
				{ role_id: 11, permission_id: 46 },
				{ role_id: 11, permission_id: 48 },
				{ role_id: 11, permission_id: 49 },
				{ role_id: 11, permission_id: 50 },

				//Tenant Profiles object permission assignment for super admin
				{ role_id: 11, permission_id: 51 },
				{ role_id: 11, permission_id: 53 },
				{ role_id: 11, permission_id: 54 },
				{ role_id: 11, permission_id: 55 },

				//Stripe Customer object permission assignment for super admin
				{ role_id: 11, permission_id: 125 },
				{ role_id: 11, permission_id: 126 },
				{ role_id: 11, permission_id: 127 },
				{ role_id: 11, permission_id: 128 },

				/***********************************
				 * Permission assignment for admin *
				 ***********************************/

				//users object permisssions assignment for admin
				{ role_id: 12, permission_id: 1 },
				{ role_id: 12, permission_id: 3 },
				{ role_id: 12, permission_id: 4 },
				{ role_id: 12, permission_id: 5 },

				//users object permisssions assignment for team manager
				{ role_id: 13, permission_id: 1 },
				{ role_id: 13, permission_id: 3 },
				{ role_id: 13, permission_id: 4 },

				//users object permisssions assignment for team manager
				{ role_id: 14, permission_id: 3 },

				//Tenants object permission assignment for admin
				{ role_id: 12, permission_id: 8 },
				{ role_id: 12, permission_id: 9 },
				{ role_id: 12, permission_id: 10 },

				//role_assignments object permission assignment for admin
				{ role_id: 12, permission_id: 16 },
				{ role_id: 12, permission_id: 18 },
				{ role_id: 12, permission_id: 19 },
				{ role_id: 12, permission_id: 20 },

				{ role_id: 13, permission_id: 16 },
				{ role_id: 13, permission_id: 18 },
				{ role_id: 13, permission_id: 19 },

				{ role_id: 14, permission_id: 18 },

				//subscription object permission assignment for admin
				{ role_id: 11, permission_id: 38 },
				{ role_id: 11, permission_id: 36 },
				{ role_id: 11, permission_id: 39 },
				{ role_id: 11, permission_id: 40 },
				{ role_id: 12, permission_id: 36 },
				{ role_id: 12, permission_id: 38 },
				{ role_id: 12, permission_id: 39 },
				{ role_id: 12, permission_id: 40 },
				{ role_id: 13, permission_id: 38 },
				{ role_id: 14, permission_id: 38 },

				//user_profiles object permission assignment for admin
				{ role_id: 12, permission_id: 46 },
				{ role_id: 12, permission_id: 48 },
				{ role_id: 12, permission_id: 49 },
				{ role_id: 12, permission_id: 50 },

				//tenant_profiles object permission assignment for admin
				{ role_id: 12, permission_id: 51 },
				{ role_id: 12, permission_id: 53 },
				{ role_id: 12, permission_id: 54 },
				{ role_id: 12, permission_id: 55 },

				//notification_subscriptions object permission assignment for admin
				{ role_id: 12, permission_id: 101 },
				{ role_id: 12, permission_id: 103 },
				{ role_id: 12, permission_id: 104 },
				{ role_id: 12, permission_id: 105 },

				//notifications object permission assignment for admin
				{ role_id: 12, permission_id: 106 },
				{ role_id: 12, permission_id: 108 },

				//stripe_customers object permission assignment for admin
				{ role_id: 12, permission_id: 125 },
				{ role_id: 12, permission_id: 126 },
				{ role_id: 12, permission_id: 127 },
				{ role_id: 12, permission_id: 128 },

				//teams object permission assignment for admin
				{ role_id: 11, permission_id: 129 },
				{ role_id: 11, permission_id: 130 },
				{ role_id: 11, permission_id: 131 },
				{ role_id: 11, permission_id: 132 },

				{ role_id: 12, permission_id: 129 },
				{ role_id: 12, permission_id: 130 },
				{ role_id: 12, permission_id: 131 },
				{ role_id: 12, permission_id: 132 },

				{ role_id: 13, permission_id: 130 },
				{ role_id: 13, permission_id: 131 },

				{ role_id: 14, permission_id: 130 },

				//clients object permission assignment for admin
				{ role_id: 11, permission_id: 133 },
				{ role_id: 11, permission_id: 134 },
				{ role_id: 11, permission_id: 135 },
				{ role_id: 11, permission_id: 136 },

				{ role_id: 12, permission_id: 133 },
				{ role_id: 12, permission_id: 134 },
				{ role_id: 12, permission_id: 135 },
				{ role_id: 12, permission_id: 136 },

				//workflows object permission assignment for admin
				{ role_id: 11, permission_id: 138 },
				{ role_id: 11, permission_id: 137 },
				{ role_id: 11, permission_id: 139 },
				{ role_id: 11, permission_id: 140 },

				{ role_id: 12, permission_id: 137 },
				{ role_id: 12, permission_id: 138 },
				{ role_id: 12, permission_id: 139 },
				{ role_id: 12, permission_id: 140 },

				{ role_id: 12, permission_id: 137 }, // TEAM MANAGER CAN CREATE WORKFLOW

				//tasks object permission assignment for admin
				{ role_id: 11, permission_id: 141 },
				{ role_id: 11, permission_id: 142 },
				{ role_id: 11, permission_id: 143 },
				{ role_id: 11, permission_id: 144 },

				{ role_id: 12, permission_id: 141 },
				{ role_id: 12, permission_id: 142 },
				{ role_id: 12, permission_id: 143 },
				{ role_id: 12, permission_id: 144 },

				//task_types object permission assignment for admin
				{ role_id: 11, permission_id: 146 },
				{ role_id: 12, permission_id: 146 },
				{ role_id: 13, permission_id: 146 },
				{ role_id: 14, permission_id: 146 },

				//user_profiles object permission assignment for team manager
				{ role_id: 13, permission_id: 46 }, // [TEAM MANAGER] can [CREATE] User Profile
				{ role_id: 13, permission_id: 48 }, // [TEAM MANAGER] can [READ] User Profile
				{ role_id: 13, permission_id: 49 }, // [TEAM MANAGER] can [UPDATE] User Profile
				// { role_id: 13, permission_id: 50 }, // [TEAM MANAGER] can [DELETE] User Profile

				//user_profiles object permission assignment for team member
				{ role_id: 14, permission_id: 48 }, // [TEAM MEMBER] can [READ] User Profile
				{ role_id: 14, permission_id: 49 }, // [TEAM MEMBER] can [UPDATE] User Profile

				//clients object permission assignment for team manager
				{ role_id: 13, permission_id: 133 }, // [TEAM MANAGER] can [CREATE] Client
				{ role_id: 13, permission_id: 134 }, // [TEAM MANAGER] can [READ] Client
				{ role_id: 13, permission_id: 135 }, // [TEAM MANAGER] can [UPDATE] Client
				// { role_id: 13, permission_id: 136 }, // [TEAM MANAGER] can [DELETE] Client

				//workflows object permission assignment for team manager
				{ role_id: 13, permission_id: 137 },
				{ role_id: 13, permission_id: 138 },
				{ role_id: 13, permission_id: 139 },
				{ role_id: 13, permission_id: 140 },

				//tasks object permission assignment for team manager
				{ role_id: 13, permission_id: 141 },
				{ role_id: 13, permission_id: 142 },
				{ role_id: 13, permission_id: 143 },
				{ role_id: 13, permission_id: 144 },

				//tasks object permission assignment for team member
				{ role_id: 14, permission_id: 141 },
				{ role_id: 14, permission_id: 142 },
				{ role_id: 14, permission_id: 143 },
				{ role_id: 14, permission_id: 144 },

				//task_types object permission assignment for team manager
				{ role_id: 13, permission_id: 146 },

				{ role_id: 14, permission_id: 48 }, // [TEAM MEMBER] can [READ] User Profile
				//clients object permission assignment for team member
				{ role_id: 14, permission_id: 134 },

				//clientsoftwarestack object permission assignment for admin
				{ role_id: 12, permission_id: 157 },
				{ role_id: 12, permission_id: 158 },
				{ role_id: 12, permission_id: 159 },
				{ role_id: 12, permission_id: 160 },

				//clientsoftwarestack object permission assignment for team manager
				{ role_id: 13, permission_id: 157 },
				{ role_id: 13, permission_id: 158 },
				{ role_id: 13, permission_id: 159 },
				{ role_id: 13, permission_id: 160 },

				//clientsoftwarestack object permission assignment for team member
				{ role_id: 14, permission_id: 158 },

				//workflowbuilder object permission assignment for admin
				{ role_id: 11, permission_id: 161 },
				{ role_id: 11, permission_id: 163 },
				{ role_id: 11, permission_id: 164 },
				{ role_id: 11, permission_id: 165 },

				{ role_id: 12, permission_id: 161 },
				{ role_id: 12, permission_id: 163 },
				{ role_id: 12, permission_id: 164 },
				{ role_id: 12, permission_id: 165 },

				//client workflow object permission assignment for super admin
				{ role_id: 11, permission_id: 171 },
				{ role_id: 11, permission_id: 173 },
				{ role_id: 11, permission_id: 174 },
				{ role_id: 11, permission_id: 175 },

				//client workflow object permission assignment for admin
				{ role_id: 12, permission_id: 171 },
				{ role_id: 12, permission_id: 173 },
				{ role_id: 12, permission_id: 174 },
				{ role_id: 12, permission_id: 175 },

				//client workflow object permission assignment for team manager
				{ role_id: 13, permission_id: 171 },
				{ role_id: 13, permission_id: 173 },
				{ role_id: 13, permission_id: 174 },

				//client workflow object permission assignment for team member
				{ role_id: 12, permission_id: 173 },

				//workflow submissions object permission assignment for admin
				{ role_id: 11, permission_id: 176 },
				{ role_id: 11, permission_id: 178 },
				{ role_id: 11, permission_id: 179 },
				{ role_id: 11, permission_id: 180 },

				{ role_id: 12, permission_id: 176 },
				{ role_id: 12, permission_id: 178 },
				{ role_id: 12, permission_id: 179 },
				{ role_id: 12, permission_id: 180 },

				{ role_id: 13, permission_id: 176 },
				{ role_id: 13, permission_id: 178 },
				{ role_id: 13, permission_id: 179 },
				{ role_id: 13, permission_id: 180 },

				{ role_id: 14, permission_id: 176 },
				{ role_id: 14, permission_id: 178 },
				{ role_id: 14, permission_id: 179 },
				{ role_id: 14, permission_id: 180 },

				//team user object permission assignment for team manager
				{ role_id: 11, permission_id: 166 },
				{ role_id: 11, permission_id: 168 },
				{ role_id: 11, permission_id: 169 },
				{ role_id: 11, permission_id: 170 },

				{ role_id: 12, permission_id: 166 },
				{ role_id: 12, permission_id: 168 },
				{ role_id: 12, permission_id: 169 },
				{ role_id: 12, permission_id: 170 },

				{ role_id: 13, permission_id: 166 },
				{ role_id: 13, permission_id: 168 },
				{ role_id: 13, permission_id: 169 },
				{ role_id: 13, permission_id: 170 },

				//socket permission assign to admin and user
				//super admin
				{ role_id: 11, permission_id: 186 },
				{ role_id: 11, permission_id: 188 },
				{ role_id: 11, permission_id: 189 },
				{ role_id: 11, permission_id: 190 },
				//admin
				{ role_id: 12, permission_id: 186 },
				{ role_id: 12, permission_id: 188 },
				{ role_id: 12, permission_id: 189 },
				{ role_id: 12, permission_id: 190 },
				//team manager
				{ role_id: 13, permission_id: 186 },
				{ role_id: 13, permission_id: 188 },
				{ role_id: 13, permission_id: 189 },
				{ role_id: 13, permission_id: 190 },
				//team member
				{ role_id: 14, permission_id: 186 },
				{ role_id: 14, permission_id: 188 },
				{ role_id: 14, permission_id: 189 },
				{ role_id: 14, permission_id: 190 },

				//comments to admin and user
				//super admin
				{ role_id: 11, permission_id: 191 },
				{ role_id: 11, permission_id: 193 },
				{ role_id: 11, permission_id: 194 },
				{ role_id: 11, permission_id: 195 },
				//admin
				{ role_id: 12, permission_id: 191 },
				{ role_id: 12, permission_id: 193 },
				{ role_id: 12, permission_id: 194 },
				{ role_id: 12, permission_id: 195 },

				//client_workflow_tasks objection permission assignment for Admin
				{ role_id: 12, permission_id: 196 },
				{ role_id: 12, permission_id: 197 },
				{ role_id: 12, permission_id: 198 },
				{ role_id: 12, permission_id: 199 },

				//client_workflow_tasks objection permission assignment for Team Manager
				{ role_id: 13, permission_id: 196 },
				{ role_id: 13, permission_id: 197 },
				{ role_id: 13, permission_id: 198 },
				{ role_id: 13, permission_id: 199 },

				//client_workflow_tasks objection permission assignment for Team Member
				{ role_id: 14, permission_id: 197 },

				//team manager
				{ role_id: 13, permission_id: 191 },
				{ role_id: 13, permission_id: 193 },
				{ role_id: 13, permission_id: 194 },
				{ role_id: 13, permission_id: 195 },
				//team member
				{ role_id: 14, permission_id: 191 },
				{ role_id: 14, permission_id: 193 },
				{ role_id: 14, permission_id: 194 },
				{ role_id: 14, permission_id: 195 },

				//admin {SLACK}
				{ role_id: 12, permission_id: 201 },
				{ role_id: 12, permission_id: 203 },
				{ role_id: 12, permission_id: 204 },
				{ role_id: 12, permission_id: 205 },

				//team_manager {SLACK}
				{ role_id: 13, permission_id: 201 },
				{ role_id: 13, permission_id: 203 },
				{ role_id: 13, permission_id: 204 },
				{ role_id: 13, permission_id: 205 },

				//team_member {SLACK}
				{ role_id: 14, permission_id: 201 },
				{ role_id: 14, permission_id: 203 },
				{ role_id: 14, permission_id: 204 },
				{ role_id: 14, permission_id: 205 },

				//client {SLACK}
				{ role_id: 15, permission_id: 201 },
				{ role_id: 15, permission_id: 203 },
				{ role_id: 15, permission_id: 204 },
				{ role_id: 15, permission_id: 205 },

				// search permission for admin and team member
				{ role_id: 12, permission_id: 207 },
				{ role_id: 13, permission_id: 207 },
			])
			.onConflict(['role_id', 'permission_id'])
			.ignore();
	} catch (err) {
		console.log(err);
	}
};
