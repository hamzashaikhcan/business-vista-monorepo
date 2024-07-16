const LeadStatuses = require('../database/models/Lead_Statuses');
const exceptionHandler = require('../utilities/Exceptions');


const listLeadStatuses = async () => {
    try {
        const data = await LeadStatuses.query().select();
        return { result: { status: 200, data: data } };
    } catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const getLeadStatus = async (id) => {
    try {
        const data = await LeadStatuses.query().findById(id).throwIfNotFound();
        return { result: { status: 200, data: data } };
    } catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const addLeadStatus = async ({ name, description }) => {
    try {
        const data = await LeadStatuses.query().insert({ name, description });
        return { result: { status: 201, data: data } };
    } catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const updateLeadStatus = async (id, updates) => {
    try {
        await LeadStatuses.query().patch(updates).findById(id).throwIfNotFound();
        return { result: { status: 200, message: 'Lead status updated' } };
    } catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const deleteLeadStatus = async (id) => {
    try {
        await LeadStatuses.query().deleteById(id).throwIfNotFound();
        return { result: { status: 200, message: 'Lead status deleted' } };
    } catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

module.exports = {
    listLeadStatuses,
    getLeadStatus,
    addLeadStatus,
    updateLeadStatus,
    deleteLeadStatus
};
