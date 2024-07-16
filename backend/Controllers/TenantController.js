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

module.exports = { listTenant, getTenant, deleteTenant };
