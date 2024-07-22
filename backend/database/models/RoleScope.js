const { Model } = require('objection');
const path = require('path');

class RoleScope extends Model {
	static get tableName() {
		return 'Role_Scope';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['user_role_id', 'team_id'],

			properties: {
				user_role_id: { type: 'integer' },
				team_id: { type: 'integer' },
			},
		};
	}

	static get relationMappings() {
		return {
			user_roles: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'UserRole'),

				join: {
					from: 'Role_Scope.user_role_id',
					to: 'User_Role.id',
				},
			},
			user_role: {
				relation: Model.BelongsToOneRelation,
				modelClass: path.join(__dirname, 'UserRole'),

				join: {
					from: 'Role_Scope.user_role_id',
					to: 'User_Role.id',
				},
			},
		};
	}
}

module.exports = RoleScope;
