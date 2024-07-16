const LeadProfiles = require('../database/models/Lead_Profiles');
const exceptionHandler = require('../utilities/Exceptions');


const listLeadProfiles = async () => {
    try {
        const data = await LeadProfiles.query().select();
        return { result: { status: 200, data: data } };
    } catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const getLeadProfile = async (id) => {
    try {
        const data = await LeadProfiles.query().findById(id).throwIfNotFound();
        return { result: { status: 200, data: data } };
    } catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const addLeadProfile = async ({ name, description }) => {
    try {
        const data = await LeadProfiles.query().insert({ name, description });
        return { result: { status: 201, data: data } };
    } catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const updateLeadProfile = async (id, updates) => {
    try {
        await LeadProfiles.query()
            .patch(updates)
            .findById(id)
            .throwIfNotFound();
        return { result: { status: 200, message: 'Lead profile updated successfully' } };
    } catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const deleteLeadProfile = async (id) => {
    try {
        await LeadProfiles.query().deleteById(id).throwIfNotFound();
        return { result: { status: 200, message: 'Lead profile deleted' } };
    } catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

module.exports = {
    listLeadProfiles,
    getLeadProfile,
    addLeadProfile,
    updateLeadProfile,
    deleteLeadProfile
};
