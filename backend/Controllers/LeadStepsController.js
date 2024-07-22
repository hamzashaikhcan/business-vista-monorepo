const LeadSteps = require('../database/models/Lead_Steps');
const exceptionHandler = require('../utilities/Exceptions');


const listLeadSteps = async () => {
    try {
        const data = await LeadSteps.query().select();
        return { result: { status: 200, data: data } };
    } catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const getLeadStep = async (id) => {
    try {
        const data = await LeadSteps.query().findById(id).throwIfNotFound();
        return { result: { status: 200, data: data } };
    } catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const addLeadStep = async ({ name, description }) => {
    try {
        const data = await LeadSteps.query().insert({ name, description });
        return { result: { status: 201, data: data } };
    } catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const updateLeadStep = async (id, updates) => {
    try {
        await LeadSteps.query()
            .patch(updates)
            .findById(id)
            .throwIfNotFound();
        return { result: { status: 200, message: 'Lead step updated successfully' } };
    } catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const deleteLeadStep = async (id) => {
    try {
        await LeadSteps.query().deleteById(id).throwIfNotFound();
        return { result: { status: 200, message: 'Lead step deleted' } };
    } catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

module.exports = {
    listLeadSteps,
    getLeadStep,
    addLeadStep,
    updateLeadStep,
    deleteLeadStep
};
