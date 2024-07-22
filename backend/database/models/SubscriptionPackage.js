const { Model } = require('objection');
const path = require('path');

class SubscriptionPackage extends Model {

	static get tableName() {
		return 'Subscription_Package';
	}

	static get jsonSchema() {
		return {

			type: 'object',
			required: ['package_name', 'stripe_id'],
			properties: {
				id: { type: 'integer' },
				package_name: { type: 'string' },
				package_details: { type: 'json' },
			}
		};
	}

	static get relationMappings() {
		return {
			Subscription: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'Subscription'),
				join: {
					from: 'SubscriptionPackage.id',
					to: 'Subscription.package_id'
				}
			},
		};
	}

}

module.exports = SubscriptionPackage;