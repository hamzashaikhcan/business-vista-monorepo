const Leads = require('../database/models/Leads');
const exceptionHandler = require('../utilities/Exceptions');

/**
 * @summary This function will get list of all available leads
 * @returns {object} Object containing result with data or error with message
 * @example listLeads()
 */
const listLeads = async function () {
    try {
        const data = await Leads.query().select();
        return { result: { status: 200, data: data } };
    } catch (err) {
        return { error: exceptionHandler.getError(err) };
    }
};

/**
 * @summary This function will get lead against given id
 * @param {number} id Unique id of the lead
 * @returns {object} Object containing result with data or error with message
 * @example getLead(number)
 */
const getLead = async function (id) {
    try {
        const data = await Leads.query().findById(id).throwIfNotFound();
        return { result: { status: 200, data: data } };
    } catch (err) {
        return { error: exceptionHandler.getError(err) };
    }
};

/**
 * @summary This function will add new lead
 * @param {object} leadData Data for the new lead
 * @returns {object} Object containing result with data or error with message
 * @example addLead({ name, profileId, ... })
 */
const addLead = async function (leadData) {
    try {
        const data = await Leads.query().insert(leadData);
        return { result: { status: 201, data: data } };
    } catch (err) {
        return { error: exceptionHandler.getError(err) };
    }
};

/**
 * @summary This function will update lead details against given id
 * @param {number} id Unique id of the lead
 * @param {object} updates Object containing the updated data
 * @returns {object} Object containing result with message or error with message
 * @example updateLead(number, { name, status, ... })
 */
const updateLead = async function (id, updates) {
    try {
        await Leads.query()
            .patch(updates)
            .findById(id)
            .throwIfNotFound();
        return { result: { status: 200, message: 'Lead updated successfully' } };
    } catch (err) {
        return { error: exceptionHandler.getError(err) };
    }
};

/**
 * @summary This function will delete lead against given id
 * @param {number} id Unique id of the lead
 * @returns {object} Object containing result with message or error with message
 * @example deleteLead(number)
 */
const deleteLead = async function (id) {
    try {
        await Leads.query().deleteById(id).throwIfNotFound();
        return { result: { status: 200, message: 'Lead deleted.' } };
    } catch (err) {
        return { error: exceptionHandler.getError(err) };
    }
};

module.exports = {
    listLeads,
    getLead,
    addLead,
    updateLead,
    deleteLead
};
