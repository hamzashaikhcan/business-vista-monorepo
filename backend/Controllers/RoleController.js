const Role = require('../database/models/Role');
const exceptionHandler = require('../utilities/Exceptions');

/**
 * @summary This function will get list of all available roles
 * @returns {object} Object containg result with data or error with message
 * @example listRole()
 */
const listRole = async function () {
	try {
		const data = await Role.query().findByIds([12, 13, 14, 15]);
		return { result: { status: 200, data: data } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @summary This function will get role against given id
 * @param {number} id Unique id of thr role
 * @returns {object} Object containg result with data or error with message
 * @example getRole (number)
 */
const getRole = async function (id) {
	try {
		const data = await Role.query().findById(id).throwIfNotFound();
		return { result: { status: 200, data: data } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @summary This function will add new role
 * @param {string} roleName
 * @returns {object} Object containg result with data or error with message
 * @example addRole ('roleName')
 */
const addRole = async function (roleName) {
	try {
		const data = await Role.query().insert({ role_name: roleName });
		return { result: { status: 201, data: data } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @summary This function will update role name against given id
 * @param {number} id Unique id of the role
 * @param {string} roleName New role name
 * @returns {object} Object containg result with message or error with message
 * @example updateRole(number, 'roleName')
 */
const updateRole = async function (id, roleName) {
	try {
		await Role.query()
			.patch({ role_name: roleName })
			.findById(id)
			.throwIfNotFound();
		return { result: { status: 200, message: 'Role name updated' } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @summary This function will delete role against given id
 * @param {number} id Unique id of the role
 * @returns {object} Object containg result with data or error with message
 * @example deleteRole (number)
 */
const deleteRole = async function (id) {
	try {
		await Role.query().deleteById(id).throwIfNotFound();
		return { result: { status: 200, message: 'Role deleted.' } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

module.exports = { listRole, getRole, addRole, updateRole, deleteRole };
