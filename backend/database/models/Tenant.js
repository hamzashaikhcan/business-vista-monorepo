const { Model } = require('objection');
const path = require('path');

class Tenant extends Model {

	static get tableName() {
		return 'Tenant';
	}

	static get jsonSchema() {
		return {

			type: 'object',

			properties: {
				id: { type: 'integer' },
				onboarding_status: {
					type: 'string',
					enum: ['PENDING', 'COMPLETE'],
					default: 'PENDING'
				},
				created_at: { type: 'number' },
				updated_at: { type: 'number' }
			}


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
			user: {
				relation: Model.HasOneThroughRelation,
				modelClass: path.join(__dirname, 'User'),
				join: {
					from: 'Tenant.id',
					through: {
						from: 'User_Role.user_id',
						to: 'User_Role.tenant_id',
					},
					to: 'User.id'
				}
			},

			role: {
				relation: Model.HasOneThroughRelation,
				modelClass: path.join(__dirname, 'Role'),
				join: {
					from: 'Tenant.id',
					through: {
						from: 'User_Role.tenant_id',
						to: 'User_Role.role_id',
					},
					to: 'Role.id'
				}
			},

			user_roles: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'UserRole'),
				join: {
					from: 'Tenant.id',
					to: 'User_Role.tenant_id',
				}
			},

		};
	}

}

module.exports = Tenant;