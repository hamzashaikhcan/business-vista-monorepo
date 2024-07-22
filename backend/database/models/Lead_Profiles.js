const { Model } = require('objection');
const path = require('path');

class LeadProfiles extends Model {
    static get tableName() {
        return 'Lead_Profiles';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],  // Adjust required fields based on your actual requirements

            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                description: { type: 'string', default: null }, // Optional, add more fields as needed
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
            leads: {
                relation: Model.HasManyRelation,
                modelClass: path.join(__dirname, 'Lead'),
                join: {
                    from: 'Lead_Profiles.id',
                    to: 'Leads.profileId'
                },
            },
            // Define other relations here if necessary
        };
    }
}

module.exports = LeadProfiles;
