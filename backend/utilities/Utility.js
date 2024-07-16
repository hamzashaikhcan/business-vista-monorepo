const bcrypt = require('bcrypt');

// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const accessKeyId = process.env.AWS_ACCESS_ID;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const bucketName = process.env.AWS_IMAGES_BUCKET_NAME || 'xyz';
const region = process.env.AWS_IMAGES_BUCKET_REGION;

aws.config.setPromisesDependency();
aws.config.update({
	accessKeyId: accessKeyId,
	secretAccessKey: secretAccessKey,
	region: region,
});

const s3 = new aws.S3();
const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: bucketName,
		acl: 'public-read',
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			cb(null, Date.now().toString() + '-' + file.originalname);
		},
	}),
});
/**
 *
 * @param {string} email Email to be validated
 * @returns {boolean} true if email is valid else false
 */
const isEmailValid = function (email) {
	const validationRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g;

	return validationRegex.test(email);
};

/**
 *
 * @param {string} password Password to be validated
 */
const isPasswordValid = function (password) {
	const validationRegex =
		/(^(?=.*[~|`|!|@|#|$|%|^|&|*|(|)|_|=|+|-])[0-9a-zA-Z~`!@#$%^,.&*()_=+-]{10,})/g;
	return validationRegex.test(password);
};

/**
 *
 * @param {string} firstname Name to be validated (firstname or lastname)
 * @returns {boolean} true if name is valid else false
 */
const isFirstNameValid = function (firstname) {
	const validationRegex = /^[A-Za-z]{2,}$/;
	return validationRegex.test(firstname);
};

/**
 *
 * @param {string} lastname Name to be validated (firstname or lastname)
 * @returns {boolean} true if name is valid else false
 */
const isSecondNameValid = function (lastname) {
	const validationRegex = /^[A-Za-z]{2,}$/;
	return validationRegex.test(lastname);
};

/**
 *
 * @param {string} company Company name to be validated
 * @returns {boolean} true if company name is valid else false
 */
const isCompanyValid = function (company) {
	const validationRegex = /^[A-Za-z0-9 &-_]{2,}$/;
	return validationRegex.test(company);
};

/**
 *
 * @param {string} contact Contact number to be validated
 * @returns {boolean} true if contact number is valid else false
 */
const isContactValid = function (contact) {
	const validationRegex = /^[0-9]{10,15}$/;
	return validationRegex.test(contact);
};



/**
 *
 * @param {string} text plain text that has to be encrypted
 * @param {number} saltRounds number of rounds for salt
 * @returns {string} encrypted hash
 */
const getHash = async function (text, saltRounds) {
	return await bcrypt.hash(text, saltRounds);
};

/**
 *
 * @param {string} plain plain text that needs to be validated
 * @param {string} hash encrypted hash that will validate plain text
 * @returns {boolean} true if hash compare is success else false
 */
const isHashValid = async function (plain, hash) {
	return await bcrypt.compare(plain, hash);
};

/**
 *
 * @param {string} text Text that you want to capitalize
 * @example toCapitalizedCase(text)
 * @returns {string} Capitalized Text
 */

const getStandardString = function (text) {
	return text.replace(/_|:|-/g, ' ').replace(/ +(?= )/g, '');
};

/**
 *
 * @summary this function will map request path to object name
 * @param {string} requestPath Request url path
 * @returns
 */
const mapRequestPathToObject = function (requestPath) {
	return requestPath.replace('/v1/', '').split('/')[0];
};

/**
 *
 * @summary This function will map request methods to action names
 * @param {string} method Name of the request method
 * @returns
 */
const mapMethodToAction = function (method) {
	const methods = {
		POST: 'CREATE',
		GET: 'READ',
		PATCH: 'UPDATE',
		PUT: 'UPDATE',
		DELETE: 'DELETE',
	};

	return methods[method];
};

module.exports = {
	isEmailValid,
	getHash,
	isHashValid,
	getStandardString,
	isPasswordValid,
	mapRequestPathToObject,
	mapMethodToAction,
	isFirstNameValid,
	isSecondNameValid,
	isCompanyValid,
	isContactValid,
	upload,
};
