const Tenant = require('../database/models/Tenant');
const User = require('../database/models/User');
// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();


const {
	isEmailValid,
	getHash,
	isHashValid,
	isPasswordValid
} = require('../utilities/Utility');
const exceptionHandler = require('../utilities/Exceptions');
const {
	generateAccessToken,
	generateRefreshToken,
	validateToken,
	generateResetPasswordToken,
	generateActivationToken,
} = require('../utilities/Authentication');
// const KafkaProducer = require('../kafka/Producer');

const { KafkaKeys } = require('./../utilities/KeyMaster');
const logger = require('../utilities/Logger');

/**
 *
 * @param {string} email Email Address
 * @param {string} password Account password
 * @param {string} firstname First Name
 * @param {string} lastname Last Name
 * @param {string} company Company
 * @param {string} contact Contact
 * @example register(email, password, firstName, lastName, origin )
 * @returns {status, message, userId} response object which includes status and message
 */
const register = async function (body, origin) {
	const {email, password} = body
	if (!email || !isEmailValid(email)) {
		return { error: { status: 400, message: 'Invalid Email Address' } };
	}

	if (!password || !isPasswordValid(password)) {
		return { error: { status: 400, message: 'Invalid Password' } };
	}

	// if (!firstname || !isFirstNameValid(firstname)) {
	// 	return { error: { status: 400, message: 'Invalid First Name' } };
	// }

	// if (!lastname || !isSecondNameValid(lastname)) {
	// 	return { error: { status: 400, message: 'Invalid Last Name' } };
	// }

	// if (!company || !isCompanyValid(company)) {
	// 	return { error: { status: 400, message: 'Invalid Company' } };
	// }

	// if (!contact || !isContactValid(contact)) {
	// 	return { error: { status: 400, message: 'Invalid Contact' } };
	// }

	const user = await User.query()
		.findOne({ email: email.toLowerCase() })
		.withGraphFetched('tenants');

	if (user) {
		return { error: { status: 400, message: 'User already exist' } };
	}

	//Genegrates hash from plain text, using salt rounds from enviornment variable or default rounds 10
	const hashPassword = await getHash(
		password,
		process.env.ENCRYPTION_SALT_ROUNDS || 10,
	);

	body.password = hashPassword;
	body.email = email.toLowerCase()

	const trx = await Tenant.startTransaction();

	try {
		const tenant = await Tenant.query(trx).insert({});

		const user = await User.query(trx).insertGraph({
			...body,
			user_role: {
				role_id: 12,
				tenant_id: tenant.id,
			},
		});

		await trx.commit();

		delete user['password'];

		const data = { tenant, user };

		//Create activation link for the user
		const activationToken = generateActivationToken(data.user.email);
		const activationLink = `${origin}/activation/${activationToken}`;

		console.log(activationLink);

		

		// KafkaProducer.sendPayload(
		// 	{
		// 		time_stamp: Date.now(),
		// 		user_id: data.user.id,
		// 		event: 'user_created',
		// 		properties: { ...data.user, first_name: firstName, last_name: lastName, role: data.role }
		// 	},
		// 	process.env.KAFKA_EVENT_TOPIC,
		// 	0
		// );

		const { access_token, expiration_timestamp } = generateAccessToken({
			id: data.user.id,
			tenant_id: data.tenant.id,
			email: data.user.email,
		});
		const refreshToken = generateRefreshToken({
			id: data.user.id,
			tenant_id: data.tenant.id,
			email: data.user.email,
		});

		return {
			result: {
				status: 201,
				data: {
					user_id: data.user.id,
					tenant_ids: [data.tenant.id],
					tenant_id: data.tenant.id,
					access_token: access_token,
					expires_at: expiration_timestamp,
					refresh_token: refreshToken,
					activation_token: activationToken,
				},

				// stream_events: [KafkaKeys.TENANT_CREATED, KafkaKeys.USER_CREATED],

				// /**
				//  * When stream data is returned from the controller sendResponse middleware will use this data to send on kafka.
				//  * Else it will use returned data
				//  * */
				// stream_data: data,

				// sensitive_events: [KafkaKeys.USER_CREATED],
				// sensitive_data: {
				// 	activation_token: activationToken,
				// 	activation_link: activationLink
				// },
			},
		};
	} catch (err) {
		logger.error(err.message);
		await trx.rollback();
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @param {string} email Email Address
 * @param {string} password Account password
 * @example login(email, password, origin)
 * @returns {object} containing status code and access token, refresh token and access token expiry timestamp
 */
const login = async function (email, password) {
	try {
		const user = await User.query()
			.findOne({ email: email.toLowerCase() })
			.withGraphFetched('[tenants, roles,user_roles.role_scopes]')
			.throwIfNotFound({ message: 'Invalid email or password' });

		const isPasswordValid = await isHashValid(password, user.password);

		if (!isPasswordValid) {
			return { error: { status: 400, message: 'Invalid email or password' } };
		}

		// if (!user.is_active) {
		// 	return { error: { status: 401, message: 'This account is inactive. Please check your email we have sent you an activation link' } };
		// }

		const { access_token, expiration_timestamp } = generateAccessToken({
			id: user.id,
			tenant_id: user.tenants[0].id,
			email: user.email,
		});
		const refreshToken = generateRefreshToken({
			id: user.id,
			tenant_id: user.tenants[0].id,
			email: user.email,
		});

		return {
			result: {
				status: 200,
				message: {
					user_id: user.id,
					tenant_ids: user.tenants.map((tenant) => tenant.id),
					tenant_id: user.tenants[0].id,
					access_token: access_token,
					refresh_token: refreshToken,
					expires_at: expiration_timestamp,
					is_active: user.is_active,
					role: user.roles,
					user_roles: user.user_roles,
				},
			},
		};
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

// /**
//  *
//  * @param {string} {email} Email Address
//  * @param {string} {password} Account password
//  * @example login(email, password, origin)
//  * @returns {object} containing status code and access token, refresh token and access token expiry timestamp
//  */
// const adminLogin = async function ({ email, password }) {

// 	try {

// 		const user = await User.query().findOne({ email: email.toLowerCase() }).throwIfNotFound({ message: 'Invalid email or password' });

// 		const isPasswordValid = await isHashValid(password, user.password);

// 		if (!isPasswordValid) {
// 			return { error: { status: 400, message: 'Invalid email or password' } };
// 		}

// 		// if (!user.is_active) {
// 		// 	return { error: { status: 401, message: 'This account is inactive. Please check your email we have sent you an activation link' } };
// 		// }

// 		const { access_token, expiration_timestamp } = generateAccessToken(user);
// 		const refreshToken = generateRefreshToken(user);

// 		return {
// 			result: {
// 				status: 200,
// 				message: {
// 					user_id: user.id,
// 					tenant_id: user.tenant_id,
// 					access_token: access_token,
// 					refresh_token: refreshToken,
// 					expires_at: expiration_timestamp,
// 				}
// 			}
// 		};

// 	} catch (err) {

// 		return { error: exceptionHandler.getError(err) };

// 	}

// };

/**
 *
 * @param {string} refreshToken JWT Token
 * @example refreshToken (refreshToken)
 */
const refreshToken = async function (refreshToken) {
	if (!refreshToken) {
		return { error: { status: 401, message: 'Unauthorized' } };
	}

	try {
		const tokenData = validateToken(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET_KEY,
		);

		const user = await User.query()
			.findOne({ email: tokenData.user.email })
			.withGraphFetched('[tenants, roles,user_roles.role_scopes]')
			.throwIfNotFound();

		const { access_token, expiration_timestamp } = generateAccessToken(
			tokenData.user,
		);

		return {
			result: {
				status: 200,
				message: {
					user_id: tokenData.user.id,
					tenant_ids: user.tenants.map((tenant) => tenant.id),
					tenant_id: tokenData.user.tenant_id,
					access_token: access_token,
					expires_at: expiration_timestamp,
					role: user.roles,
					user_roles: user.user_roles,
				},
			},
		};
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @param {string} origin Origin from which the request is recieved
 * @param {string} email Email of user who requested password reset
 */
const requestResetPassword = async function (origin, email) {
	if (!isEmailValid(email)) {
		return { error: { status: 400, message: 'Invalid Email' } };
	}

	try {
		const user = await User.query()
			.findOne({ email: email.toLowerCase() })
			.throwIfNotFound({
				message: 'This email is not registered in out system',
			});

		const resetPasswordToken = generateResetPasswordToken(email);
		const resetLink = `${origin}/resetpassword/${resetPasswordToken}`;

		// console.log(user, resetLink);
		logger.debug({ user, resetLink });

		

		return {
			result: {
				status: 200,
				message: { reset_password_token: resetPasswordToken },
			},
		};
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @param {string} resetToken Reset token string
 * @param {string} password New password
 */
const resetPassword = async function (resetToken, password) {
	if (!isPasswordValid(password)) {
		return { error: { status: 400, message: 'Invalid new password' } };
	}

	try {
		const tokenData = validateToken(
			resetToken,
			process.env.RESET_PASSWORD_TOKEN_SECRET_KEY,
		);

		const hashPassword = await getHash(
			password,
			process.env.ENCRYPTION_SALT_ROUNDS || 10,
		);

		await User.query()
			.patch({ password: hashPassword, is_active: true })
			.where({ email: tokenData.user.email })
			.throwIfNotFound();

		return {
			result: { status: 200, message: 'User Password has been updated' },
		};
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 *
 * @param {string} origin Origin from which the request is recieved
 * @param {string} email Email of user who requested password reset
 */
const requestActivationToken = async function (origin, email) {
	if (!isEmailValid(email)) {
		return { error: { status: 400, message: 'Invalid Email' } };
	}

	try {
		const user = await User.query()
			.findOne({ email: email.toLowerCase() })
			.throwIfNotFound({
				message: 'This email is not registered in our system',
			});

		//Create activation link for the user
		const activationToken = generateActivationToken(user.email);
		const activation_link = `${origin}/activation/${activationToken}`;

	

		console.log('Activation Link', activation_link);

		return {
			result: {
				status: 200,
				message: 'Activation token has been sent to your email',
			},
		};
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

/**
 * @summary This function will activate user after validating token
 * @param {string} token JWT token to validate user email
 * @returns
 */
const activateUser = async function (token) {
	try {
		const tokenData = validateToken(
			token,
			process.env.USER_ACTIVATION_TOKEN_SECRET_KEY,
		);

		await User.query()
			.patch({ is_active: true })
			.where({ email: tokenData.user.email })
			.throwIfNotFound();

		return { result: { status: 200, message: 'Account activated' } };
	} catch (err) {
		return { error: exceptionHandler.getError(err) };
	}
};

module.exports = {
	register,
	login,
	refreshToken,
	requestResetPassword,
	resetPassword,
	activateUser,
	requestActivationToken,
};
