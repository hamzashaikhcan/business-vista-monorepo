const Tenant = require('../database/models/Tenant');
const exceptionHandler = require('../utilities/Exceptions');

/**
 * @returns {object} response object with result or error containing data or message
 * @example listTenant()
 */
const listTenant = async function () {
	try {
		const tenant = await Tenant.query();

		return { result: { status: 200, data: tenant } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @param {number} tenantId Unique id of the tenant
 * @returns {object} response object with result or error containing data or message
 * @example getTenant()
 */
const getTenant = async function (tenantId) {
	try {
		const tenant = await Tenant.query()
			.findOne({ id: tenantId })
			.throwIfNotFound();

		return { result: { status: 200, data: tenant } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @param {number} tenantId Unique id of the tenant
 * @returns {object} response object with result or error containing data or message
 * @example deleteTenant(number)
 */
const deleteTenant = async function (tenantId) {
	try {
		await Tenant.query().deleteById(tenantId).throwIfNotFound();

		return { result: { status: 200, message: 'Tenant Deleted' } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 * @summary This function will update tenant details based on the given ID.
 * @param {number} id - The unique identifier of the tenant to be updated.
 * @param {string} email - New email to be updated.
 * @returns {object} - Object containing either the result with a message or an error with a message.
 */

const updateTenant = async function (id, email) {
    try {
        const tenant = await Tenant.query().findById(id);
        if (!tenant) {
            return { error: { status: 404, message: 'Tenant not found' } };
        }

        const updatedTenant = await Tenant.query().patchAndFetchById(id, { email });
        
        return {
            result: {
                status: 200,
                message: 'Tenant updated successfully',
                data: updatedTenant
            }
        };
    } catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

module.exports = { listTenant, getTenant, deleteTenant, updateTenant };
