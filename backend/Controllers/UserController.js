const User = require('../database/models/User');
const UserRole = require('../database/models/UserRole');

// Load environment variables from .env file
const dotenv = require('dotenv');

dotenv.config();

// const RoleScope = require('../database/models/RoleScope');

const {
	isPasswordValid,
	getHash,
	isHashValid,
	isEmailValid,
} = require('../utilities/Utility');
const exceptionHandler = require('../utilities/Exceptions');
//const KafkaProducer = require('../kafka/Producer');
const { generateResetPasswordToken } = require('../utilities/Authentication');
const { KafkaKeys } = require('../utilities/KeyMaster');

/**
 *
 * @param {number} userId userId Id of the tenant admin
 * @returns {object} result with status code and json data or error message
 */
const listUsers = async function (tenant_id, { expand } = {}) {
	try {
		const query = User.query()
			.select('User.id', 'User.email', 'User.is_active')
			.withGraphFetched(expand)
			.joinRelated('user_role')
			.where('user_role.tenant_id', '=', tenant_id)
			.orderBy('id');

		const users = await query;

		return { result: { status: 200, data: users } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @param {number} userId id of the user
 * @returns {object} result with status code and json data or error with status code with error message
 * @example getUser (1, 4)
 */
// const getUser = async function (userId) {
const getUser = async function (tenant_id, userId) {
	try {
		const user = await User.query()
			.select('id', 'email', 'is_active')
			.findById(userId)
			.withGraphFetched('user_role.roles')
			.throwIfNotFound({
				message: 'No user found',
			});

		return { result: { status: 200, data: user } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @param {string} email Email of the user
 * @param {number} tenantId Tenant id of the user
 * @returns {object} Object containg status and user data on successs and error message on fail
 * @example addUser (test@mail.com)
 */
const addUsers = async function (email, tenantId, roleId, teamId, name, image) {
	email = email.toLowerCase();
	if (!isEmailValid(email)) {
		return { error: { status: 400, message: 'Invalid email address' } };
	}

	const password = Math.random().toString(36).substring(16);
	const hashPassword = await getHash(password, 10);

	try {
		if (!roleId) {
			throw { name: 'BadRequestError', message: 'role id is required field' };
		}

		if (!teamId) {
			throw { name: 'BadRequestError', message: 'team id is required' };
		}

		const same_tenant = await User.query()
			.joinRelated('role_scope')
			.where({ team_id: teamId });

		let team_users = [];
		for (let i = 0; i < same_tenant.length; i++) {
			team_users.push({ user_id: same_tenant[i].id });
		}

		let user;
		if (roleId === 11 || roleId === 12) {
			user = await User.query().insertGraph({
				email: email.toLowerCase(),
				password: hashPassword,
				user_role: {
					role_id: roleId,
					tenant_id: tenantId,
				},
			});
		} else {
			user = await User.query().insertGraph({
				email: email.toLowerCase(),
				password: hashPassword,
				user_role: {
					role_id: roleId,
					tenant_id: tenantId,
					role_scopes: {
						team_id: teamId,
					},
				},
			});
		}

		const resetPasswordToken = generateResetPasswordToken(email);
		const resetLink = `${process.env.WEB_ORIGIN}/resetpassword/${resetPasswordToken}`;

		delete user['password'];

		
		// const user_tenant = await Tenant.query()
		// 	.where({ id: tenantId })
		// 	.withGraphFetched('user');
		// console.log('USER TENANT => ', user_tenant);
		// const slack_message = {
		// 	blocks: [
		// 		{
		// 			type: 'header',
		// 			text: {
		// 				type: 'plain_text',
		// 				text: `:white_check_mark: New user added: ${name}`,
		// 				emoji: true,
		// 			},
		// 		},
		// 		{
		// 			type: 'section',
		// 			text: {
		// 				type: 'mrkdwn',
		// 				text: `${name} has been added to your team.`,
		// 			},
		// 		},
		// 		{
		// 			type: 'section',
		// 			text: {
		// 				type: 'mrkdwn',
		// 				text: `Visit ${name}'s profile: <https://staging.levvy.net/user-profile/${user.id}|https://staging.levvy.net/user-profile/${user.id}>`,
		// 			},
		// 		},
		// 	],
		// };

		// KafkaProducer.sendPayload(
		// 	{
		// 		time_stamp: Date.now(),
		// 		id: team_users,
		// 		tenant_id: user.tenant_id,
		// 		event: 'slack_message',
		// 		properties: {
		// 			text: slack_message,
		// 		},
		// 	},
		// 	process.env.KAFKA_SENSITIVE_TOPIC,
		// 	0,
		// );

		return {
			result: {
				status: 201,
				message: {
					user_id: user.id,
					tenant_id: user.tenant_id,
				},
			},
		};
	} catch (err) {
		console.log(err);
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @param {number} userId Id of the user
 * @example deleteUser(1);
 * @returns {object} Object containing result or error
 */
const deleteUser = async function (userId, { id, tenant_id }) {
	try {
		if (id == userId) {
			throw new Error("This user can't be delete");
		}

		await User.query().deleteById(userId).throwIfNotFound();
		

		return { result: { status: 200, message: 'User deleted' } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @param {number} id user id
 * @param {string} email user email
 * @param {string} password user password
 * @param {string} newPassword new user password
 */
const updatePassword = async function (id, password, newPassword) {
	if (!password) {
		return { error: { status: 400, message: 'Wrong Password' } };
	}

	if (!newPassword || !isPasswordValid(newPassword)) {
		return { error: { status: 400, message: 'Invalid new password' } };
	}

	const hashPassword = await getHash(
		newPassword,
		process.env.ENCRYPTION_SALT_ROUNDS || 10,
	);

	try {
		const user = await User.query().findOne({ id: id }).throwIfNotFound();

		const isPasswordValid = await isHashValid(password, user.password);

		if (!isPasswordValid) {
			return { error: { status: 403, message: 'Wrong Password' } };
		}

		await User.query().patch({ password: hashPassword }).findById(id);

		return { result: { status: 200, message: 'Password Updated' } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @param {number} id user id
 * @param {string} email user email
 * @param {string} roleId user roleId
 * @param {string} tenantId tenantId
 */
const updateUser = async function (id, body, tenantId) {
	const trx = await User.startTransaction();
	try {
		// const tenant = await Tenant.query().findOne({ id: tenantId }).throwIfNotFound();

		// if (body.email.split('@')[1] !== tenant.tenant_domain) {
		// 	return { error: { status: 400, message: `You can only add user that have @${tenant.tenant_domain} email address` } };
		// }

		const existingUser = await User.query().findOne({ email: body.email });
		await User.query(trx)
			.patch({ email: body.email })
			.where('id', id)
			.throwIfNotFound({ message: 'Email not found' });
		if (body.role_id) {
			await UserRole.query(trx)
				.patch({ role_id: body.role_id })
				.where({ user_id: id })
				.where({ tenant_id: tenantId })
				.throwIfNotFound({ message: 'Unable to assign role to this user' });
		}
		await trx.commit();
		if (!existingUser) {
			const resetPasswordToken = generateResetPasswordToken(body.email);
			const resetLink = `${process.env.WEB_ORIGIN}/resetpassword/${resetPasswordToken}`;
			
		}

		// KafkaProducer.sendPayload(
		// 	{
		// 		time_stamp: Date.now(),
		// 		user_id: id,
		// 		event: 'user_updated',
		// 		properties: { body },
		// 	},
		// 	process.env.KAFKA_EVENT_TOPIC,
		// 	0,
		// );

		return { result: { status: 200, message: 'User Updated' } };
	} catch (err) {
		await trx.rollback();
		return { error: exceptionHandler.getError(err) };
	}
};

// const switchTenantAccount = async function (user, newTenantId) {
// 	try {
// 		user.tenant_id = newTenantId;

// 		const { access_token, expiration_timestamp } = generateAccessToken(user);

// 		const refreshToken = await generateRefreshToken(user);

// 		return {
// 			result: {
// 				status: 200,
// 				message: {
// 					user_id: user.id,
// 					tenant_ids: user.tenant_ids,
// 					access_token: access_token,
// 					refresh_token: refreshToken,
// 					expires_at: expiration_timestamp,
// 				},
// 			},
// 		};
// 	} catch (err) {
// 		return { error: exceptionHandler.getError(err) };
// 	}
// };

const multiDelete = async ({ ids }, user) => {
	try {
		const data = await User.query()
			.delete()
			.whereIn('id', ids)
			.throwIfNotFound();

		
		return {
			result: {
				status: 200,
				data,
			},
		};
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

const management_filter = async (user) => {
	try {
		const sql = User.query()
			.joinRelated('user_role')
			.where({ tenant_id: user.tenant_id })
			.withGraphFetched('user_role.[role_scopes, roles]');

		const users = await sql;

		let roles = [];
		for (let i = 0; i < users.length; i++) {
			if (!roles.find((r) => r.value === users[i].user_role.role_id)) {
				roles.push({
					label: users[i].user_role.roles.role_name,
					value: users[i].user_role.roles.id,
					user_id: users
						.filter((u) => u.user_role.roles.id === users[i].user_role.roles.id)
						.map((u) => u.id),
				});
			}
		}
		let data = { roles: roles };

		return {
			result: {
				status: 201,
				data: data,
			},
		};
	} catch (err) {
		console.log(exceptionHandler.getError(err));
		return { error: exceptionHandler.getError(err) };
	}
};

module.exports = {
	listUsers,
	getUser,
	addUsers,
	deleteUser,
	updatePassword,
	updateUser,
	// switchTenantAccount,
	multiDelete,
	management_filter,
};
