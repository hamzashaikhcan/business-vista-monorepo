const jwt = require('jsonwebtoken');
// Load environment variables from .env file
const dotenv = require('dotenv');

dotenv.config();

/**
 *
 * @param {object} user for which the token will be generated
 * @param {number} expirationTimestamp token expiration timestamp
 * @param {string} key key that will be used to encrypt the object
 * @example getAccessToken (user);
 * @returns {string} token string
 */
const getToken = function (user, expirationTimestamp, key) {
	return jwt.sign({ exp: expirationTimestamp, user: user }, key);
};

/**
 *
 * @param {string} token token string to be verified
 * @param {string} key secrete against which token will be verified
 * @example validateToken(token, key)
 * @returns {object} error if token is not valid else user
 */
const validateToken = function (token, key) {
	return jwt.verify(token, key);
};

/**
 *
 * @param {object} user User object for which the token will be generated
 * @example generateAccessToken (user)
 */
const generateAccessToken = function (user) {
	const accessTokenExpirationTime = Math.floor(Date.now() / 1000) + 60 * 60; //3600 = 1 hours
	const accessTokenScerete =
		process.env.ACCESS_TOKEN_SECRET_KEY || 'secretaccess';

	const token = getToken(
		{ id: user.id, email: user.email, tenant_id: user.tenant_id },
		accessTokenExpirationTime,
		accessTokenScerete,
	);

	return {
		access_token: token,
		expiration_timestamp: accessTokenExpirationTime,
	};
};

/**
 *
 * @param {object} user User object for which the token will be generated
 * @example generateRefreshToken(user)
 */
const generateRefreshToken = function (user) {
	const refreshTokenExpirationTime =
		Math.floor(Date.now() / 1000) + 3600 * (24 * 7); //3600 * (24 * 7) = 7 days
	const refreshTokenSecrete =
		process.env.REFRESH_TOKEN_SECRET_KEY || 'secretrefresh';

	return getToken(
		{ id: user.id, email: user.email, tenant_id: user.tenant_id },
		refreshTokenExpirationTime,
		refreshTokenSecrete,
	);
};

/**
 *
 * @param {string} email for which to reset password link will be generated
 * @returns
 */
const generateResetPasswordToken = function (email) {
	const expiryTime = Math.floor(Date.now() / 1000) + 3600 * (24 * 2); //3600 * (24 * 7) = 7 days
	const resetPasswordSecrete = process.env.RESET_PASSWORD_TOKEN_SECRET_KEY;

	return getToken({ email: email }, expiryTime, resetPasswordSecrete);
};

/**
 * @summary This function will generate activation token for the user
 * @param {string} email user email
 * @example generateActivationToken(test@example.com)
 * @returns
 */
const generateActivationToken = function (email) {
	const expiryTime = Math.floor(Date.now() / 1000 + 3600 * 5);
	const userActivationTokenSecrete =
		process.env.USER_ACTIVATION_TOKEN_SECRET_KEY;

	return getToken({ email: email }, expiryTime, userActivationTokenSecrete);
};

module.exports = {
	validateToken,
	generateAccessToken,
	generateRefreshToken,
	generateResetPasswordToken,
	generateActivationToken,
};
