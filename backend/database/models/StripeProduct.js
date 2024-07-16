const { Model } = require('objection');
const path = require('path');

class StripeProduct extends Model {

	static get tableName() {
		return 'StripeProduct';
	}

	$beforeUpdate() {
		this.updated_at = new Date();
	}

	static get jsonSchema() {
		return {

			type: 'object',
			required: ['id', 'name'],
			properties: {
				id: { type: 'string' },
				name: { type: 'string' },
				is_public: { type: 'boolean', default: false },
				is_active: { type: 'boolean', default: true }
			}
		};
	}

	static get relationMappings() {
		return {

			stripe_pricings: {
				relation: Model.HasManyRelation,
				modelClass: path.join(__dirname, 'StripePricing'),
				join: {
					from: 'StripeProduct.id',
					to: 'StripePricing.stripe_product_id'
				},
				filter: (q) => q.where({ is_active: true }),
			},

			subscriptions: {
				relation: Model.ManyToManyRelation,
				modelClass: path.join(__dirname, 'Subscription'),
				join: {
					from: 'StripeProduct.id',
					through: {
						from: 'StripePricing.stripe_product_id',
						to: 'StripePricing.id'
					},
					to: 'Subscription.stripe_pricing_id'
				}
			}

		};
	}

}

module.exports = StripeProduct;