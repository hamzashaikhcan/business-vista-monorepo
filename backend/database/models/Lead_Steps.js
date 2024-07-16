const { Model } = require('objection');
const path = require('path');

class LeadSteps extends Model {
    static get tableName() {
        return 'Lead_Steps';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                leadId: { type: 'integer' },
                created_at: { type: 'date-time', default: new Date().toISOString() },
                updated_at: { type: 'date-time', default: new Date().toISOString() }
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
            lead: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join(__dirname, 'Lead'),
                join: {
                    from: 'Lead_Steps.leadId',
                    to: 'Leads.id',
                },
            }
        };
    }
}

module.exports = LeadSteps;
