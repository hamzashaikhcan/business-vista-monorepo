const { Model } = require('objection');
const path = require('path');

class StripePricing extends Model {

	static get tableName() {
		return 'StripePricing';
	}

	static get jsonSchema() {
		return {

			type: 'object',
			required: ['id', 'stripe_product_id', 'price_per_unit'],
			properties: {
				id: { type: 'string' },
				stripe_product_id: { type: 'string' },
				group_key: { type: 'string' },
				price_per_unit: { type: 'decimal' },
				is_recurring: { type: 'boolean', default: true },
				interval: {
					type: ['string', 'null'],
				},
				trial_period_days: { type: 'integer', default: 0 },
				allowed_users: { type: ['integer', 'null'] },
				payment_threshold: { type: ['integer', 'null'] },
				alert_threshold: { type: ['integer', 'null'] },
				is_active: { type: 'boolean', default: true }
			}
		};
	}

	static get relationMappings() {
		return {

			subscriptions: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'Subscription'),

				join: {
					from: 'StripePricing.id',
					to: 'Subscription.stripe_pricing_id'
				}
			},

			stripe_product: {
				relation: Model.BelongsToOneRelation,
				modelClass: path.join(__dirname, 'StripeProduct'),
				join: {
					from: 'StripePricing.stripe_product_id',
					to: 'StripeProduct.id'
				}
			}

		};
	}

}

module.exports = StripePricing;