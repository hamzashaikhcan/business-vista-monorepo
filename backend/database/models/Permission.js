const { Model } = require('objection');

class Permission extends Model {

	static get tableName() {

		return 'Permission';

	}

	static get jsonSchema() {
		return {

			type: 'object',
			required: ['object_name', 'action_name'],

			properties: {
				object_name: { type: 'string' },
				action_name: { type: 'string' }
			}

		};
	}

}

module.exports = Permission;