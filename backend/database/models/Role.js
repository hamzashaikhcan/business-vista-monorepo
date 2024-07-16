const { Model } = require('objection');
const path = require('path');
class Role extends Model {
	static get tableName() {
		return 'Role';
	}

	static get idColoumn() {
		return 'id';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['role_name'],

			properties: {
				role_name: { type: 'string' },
			},
		};
	}

	static get relationMappings() {
		return {
			permissions: {
				relation: Model.ManyToManyRelation,
				modelClass: path.join(__dirname, 'Permission'),

				join: {
					from: 'Role.id',
					through: {
						from: 'Permission_Assignment.role_id',
						to: 'Permission_Assignment.permission_id',
					},
					to: 'Permission.id',
				},
			},

			user_roles: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'UserRole'),
				join: {
					from: 'Role.id',
					to: 'User_Role.role_id',
				},
			},
		};
	}
}

module.exports = Role;
