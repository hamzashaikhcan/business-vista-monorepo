const { Model } = require('objection');
const path = require('path');

class Subscription extends Model {

	static get tableName() {
		return 'Subscription';
	}

	static get jsonSchema() {
		return {

			type: 'object',
			required: ['stripe_pricing_id', 'stripe_customer_id', 'tenant_id', 'stripe_subscription_id', 'expires_at'],
			properties: {
				id: { type: 'integer' },
				stripe_pricing_id: { type: 'string' },
				status: {
					type: 'string',
					enum: ['pending', 'active', 'past_due', 'unpaid', 'canceled', 'incomplete', 'incomplete_expired', 'trialing', 'all', 'ended'],
					default: 'pending'
				},
				tenant_id: { type: 'integer' },
				stripe_customer_id: { type: 'string' },
				stripe_subscription_id: { type: 'string' },
				alert_status: { type: 'boolean', default: false },
				expires_at: { type: 'integer' }
			}
		};
	}

	static get relationMappings() {
		return {

			stripe_pricing: {
				relation: Model.HasOneRelation,
				modelClass: path.join(__dirname, 'StripePricing'),
				join: {
					from: 'Subscription.stripe_pricing_id',
					to: 'StripePricing.id'
				}
			},

			stripe_product: {
				relation: Model.HasOneThroughRelation,
				modelClass: path.join(__dirname, 'StripeProduct'),
				join: {
					from: 'Subscription.stripe_pricing_id',
					through: {
						from: 'StripePricing.id',
						to: 'StripePricing.stripe_product_id',
					},
					to: 'StripeProduct.id'
				}
			},

			tenant: {
				relation: Model.BelongsToOneRelation,
				modelClass: path.join(__dirname, 'Tenant'),
				join: {
					from: 'Subscription.tenant_id',
					to: 'Tenant.id'
				}
			}

		};
	}
}

module.exports = Subscription;