const { Model } = require('objection');
const path = require('path');

class LeadStatuses extends Model {
    static get tableName() {
        return 'Lead_Statuses';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                description: { type: 'string', default: null }, // Optional description field
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
        // If you need to define relationships, such as leads that currently hold this status
        return {
            leads: {
                relation: Model.HasManyRelation,
                modelClass: path.join(__dirname, 'Lead'),
                join: {
                    from: 'Lead_Statuses.id',
                    to: 'Leads.status'
                },
            }
        };
    }
}

module.exports = LeadStatuses;
