const { Model } = require('objection');
const path = require('path');

class User extends Model {
	static get tableName() {
		return 'User';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['email', 'password'],

			properties: {
				id: { type: 'integer' },
				firstname: {type: 'string'},
				lastname: {type: 'string'},
				email: { type: 'string' },
				password: { type: 'string' },
				company: {type: 'string'},
				contact: {type: 'string'},
				is_active: {
					type: 'boolean',
					default: false,
				},
				created_at: { type: 'date-time' },
				updated_at: { type: 'date-time' },
			},
		};
	}

	$beforeInsert() {
		this.created_at = new Date().toISOString();
	}

	$beforeUpdate() {
		this.updated_at = new Date().toISOString();
	}

	static get relationMappings() {
		return {
			user_role: {
				relation: Model.HasOneRelation,
				modelClass: path.join(__dirname, 'UserRole'),
				join: {
					from: 'User.id',
					to: 'User_Role.user_id',
				},
			},
			user_roles: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'UserRole'),
				join: {
					from: 'User.id',
					to: 'User_Role.user_id',
				},
			},

			roles: {
				relation: Model.HasOneThroughRelation,
				modelClass: path.join(__dirname, 'Role'),

				join: {
					from: 'User.id',
					through: {
						from: 'User_Role.user_id',
						to: 'User_Role.role_id',
					},
					to: 'Role.id',
				},
			},

			role_scope: {
				relation: Model.HasOneThroughRelation,
				modelClass: path.join(__dirname, 'RoleScope'),

				join: {
					from: 'User.id',
					through: {
						from: 'User_Role.user_id',
						to: 'User_Role.id',
					},
					to: 'Role_Scope.user_role_id',
				},
			},

			role_scopes: {
				relation: Model.ManyToManyRelation,
				modelClass: path.join(__dirname, 'RoleScope'),

				join: {
					from: 'User.id',
					through: {
						from: 'User_Role.user_id',
						to: 'User_Role.id',
					},
					to: 'Role_Scope.user_role_id',
				},
			},

			tenants: {
				relation: Model.ManyToManyRelation,
				modelClass: path.join(__dirname, 'Tenant'),

				join: {
					from: 'User.id',
					through: {
						from: 'User_Role.user_id',
						to: 'User_Role.tenant_id',
					},
					to: 'Tenant.id',
				},
			},
		};
	}
}

module.exports = User;
