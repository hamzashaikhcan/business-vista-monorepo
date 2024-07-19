const { Model } = require('objection');
const path = require('path');

class Leads extends Model {
    static get tableName() {
        return 'Leads';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                profile_id: { type: 'integer' },
                bd_id: { type: 'integer' },
                assignee_id: { type: 'integer' },
                current_step: { type: 'integer' },
                status: { type: 'integer' },
                description: { type: 'string' },
                resume: { type: 'string' },
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
