const UserRole = require('../database/models/UserRole');
const Subscription = require('../database/models/Subscription');
const exceptionHandler = require('../utilities/Exceptions');
const { Roles } = require('../utilities/KeyMaster');
const RoleScope = require('../database/models/RoleScope');

/**
 *
 * @summary This function will list all roles and permissions of the user
 * @param {number} userId Unique id of the user
 * @returns
 */
const listPermissions = async function (userId) {
	try {
		const data = await UserRole.query()
			.select('role_id', 'roles.role_name')
			.joinRelated('roles')
			.where('user_id', userId)
			.withGraphFetched('permissions');

		return { result: { status: 200, data: data } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @summary This function will check permission of the user for action on given object name
 * @param {number} userId
 * @param {number} tenantId
 * @param {string} objectName
 * @param {string} actionName
 * @returns
 */
const checkPermission = async function (
	userId,
	tenantId,
	objectName,
	actionName,
) {
	try {
		console.log(
			'Checking permission for userId: ',
			userId,
			' tenantId: ',
			tenantId,
			' objectName: ',
			objectName,
			' actionName: ',
			actionName,
		);

		// const data = await UserRole.query().select('*', 'permission.object_name, permission.action_name').joinRelated('permission')
		// 	.where('permission.object_name', objectName)
		// 	.where('permission.action_name', actionName)
		// 	.findOne({ user_id: userId, tenant_id: tenantId })
		// 	.throwIfNotFound();

		const data = await UserRole.query()
			.where({ user_id: userId, tenant_id: tenantId })
			.withGraphJoined('permission')
			.where('permission.object_name', objectName)
			.where('permission.action_name', actionName)
			.throwIfNotFound();

		if (
			data[0].role_id === Roles['Admin'] ||
			data[0].role_id === Roles['Super Admin']
		) {
			data['role_scopes'] = [];
		} else {
			const scope = await RoleScope.query().whereIn(
				'user_role_id',
				data.map((user_role) => user_role.id),
			);
			data['role_scopes'] = scope.length > 0 ? scope : null;
		}

		return { result: { status: 200, data: data } };
	} catch (err) {
		console.log('Error --->', err.message);
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 */

const getSubscriptionPackage = async function (tenantId) {
	try {
		const subscription = await Subscription.query()
			.select('subscription_package.*')
			.findOne({ tenant_id: tenantId })
			.joinRelated('subscription_package')
			.throwIfNotFound();

		return { result: { status: 200, data: subscription } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

module.exports = { listPermissions, checkPermission, getSubscriptionPackage };
