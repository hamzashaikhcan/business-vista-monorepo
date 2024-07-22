const { Model } = require('objection');
const path = require('path');

class Leads extends Model {
    static get tableName() {
        return 'Leads';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'status'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                profileId: { type: 'integer' },
                bdId: { type: 'integer' },
                assigneeId: { type: 'integer' },
                currentStep: { type: 'integer' },
                status: { type: 'string' },
                description: { type: 'string' },
                resume: { type: 'string' },
                is_active: { type: 'boolean', default: false },
                created_at: { type: 'date-time' },
                updated_at: { type: 'date-time' },
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
            profile: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join(__dirname, 'LeadProfile'),
                join: {
                    from: 'Leads.profileId',
                    to: 'Lead_Profiles.id',
                },
            },
            businessDeveloper: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join(__dirname, 'User'), // Assuming 'User' as Business Developer
                join: {
                    from: 'Leads.bdId',
                    to: 'User.id',
                },
            },
            assignee: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join(__dirname, 'User'), // Assuming 'User' as Assignee
                join: {
                    from: 'Leads.assigneeId',
                    to: 'User.id',
                },
            },
            leadStep: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join(__dirname, 'LeadStep'),
                join: {
                    from: 'Leads.currentStep',
                    to: 'Lead_Steps.id',
                },
            },
            statuses: {
                relation: Model.HasManyRelation,
                modelClass: path.join(__dirname, 'LeadStatus'),
                join: {
                    from: 'Leads.status',
                    to: 'Lead_Statuses.name',
                },
            },
        };
    }
}

module.exports = Leads;
