const { Model } = require('objection');
const path = require('path');

class PermissionAssignment extends Model {

	static get tableName() {
		return 'Permission_Assignment';
	}

	static get jsonSchema() {
		return {

			type: 'object',
			required: ['permission_id', 'role_id'],

			properties: {
				permission_id: { type: 'integer' },
				role_id: { type: 'integer' }
			}

		};
	}

	static get relationMappings() {

		return {
			permissions: {
				relation: Model.HasOneRelation,
				modelClass: path.join(__dirname, 'Permission'),

				join: {
					from: 'Permission_Assignment.permission_id',
					to: 'Permission.id'
				}

			}
		};

	}

}

module.exports = PermissionAssignment;