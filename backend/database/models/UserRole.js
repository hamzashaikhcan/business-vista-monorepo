const { Model } = require('objection');
const path = require('path');

class UserRole extends Model {
	static get tableName() {
		return 'User_Role';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['user_id', 'tenant_id', 'role_id'],

			properties: {
				user_id: { type: 'integer' },
				tenant_id: { type: 'integer' },
				role_id: { type: 'integer' },
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
			users: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'User'),

				join: {
					from: 'User_Role.user_id',
					to: 'User.id',
				},
			},

			roles: {
				relation: Model.BelongsToOneRelation,
				modelClass: path.join(__dirname, 'Role'),

				join: {
					from: 'User_Role.role_id',
					to: 'Role.id',
				},
			},

			permissions: {
				relation: Model.ManyToManyRelation,
				modelClass: path.join(__dirname, 'Permission'),

				join: {
					from: 'User_Role.role_id',
					through: {
						from: 'Permission_Assignment.role_id',
						to: 'Permission_Assignment.permission_id',
					},
					to: 'Permission.id',
				},
			},

			permission: {
				relation: Model.HasOneThroughRelation,
				modelClass: path.join(__dirname, 'Permission'),

				join: {
					from: 'User_Role.role_id',
					through: {
						from: 'Permission_Assignment.role_id',
						to: 'Permission_Assignment.permission_id',
					},
					to: 'Permission.id',
				},
			},

			role_scopes: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'RoleScope'),
				join: {
					from: 'User_Role.id',
					to: 'Role_Scope.user_role_id',
				},
			},
		};
	}
}

module.exports = UserRole;
