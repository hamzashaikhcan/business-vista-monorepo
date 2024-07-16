exports.KafkaKeys = Object.freeze({
	TENANT_CREATED: 'tenant_created',
	TENANT_UPDATED: 'tenant_updated',
	TENANT_DELETED: 'tenant_deleted',
	TENANT_PROFILE_CREATED: 'tenant_profile_created',
	TENANT_PROFILE_UPDATED: 'tenant_profile_updated',

	USER_CREATED: 'user_created',
	USER_ADDED: 'user_added',
	USER_UPDATED: 'user_updated',
	USER_DELETED: 'user_deleted',
	USER_PROFILE_CREATED: 'user_profile_created',
	USER_PROFILE_UPDATED: 'user_profile_updated',

	CLIENT_CREATED: 'client_created',
	CLIENT_UPDATED: 'client_updated',
	CLIENT_DELETED: 'client_deleted',

	SUBSCRIPTION_CREATED: 'subscription_created',
	SUBSCRIPTION_UPDATED: 'subscription_updated',
	SUBSCRIPTION_PACKAGE_CHANGED: 'subscription_package_changed',
	SUBSCRIPTION_DELETED: 'subscription_deleted',

	TEAM_DELETED: 'team_deleted',

	USER_TEAM_ADDED: 'user_team_added',
	USER_TEAM_DELETED: 'user_team_deleted',

	ROLE_ASSIGNED: 'role_assigned',
	ROLE_UPDATED: 'role_updated',
	USER_ROLE_UPDATED: 'user_role_updated',
	TEAM_ROLE_UPDATED: 'team_role_updated',
	USER_EMAIL_UPDATED: 'user_email_updated',
	
	RESET_PASSWORD: 'reset_password',

	ACTIVATION_TOKEN_REQUESTED: 'activation_token_requested',
});

exports.StatusCode = Object.freeze({
	/**
	 * 200 | The request was successfully completed.
	 */
	SUCCESS: 200,

	/**
	 * 201 | A new resource was successfully created.
	 */
	CREATED: 201,

	/**
	 * 204 | The server successfully processed the request, but is not returning any content.
	 */
	NO_CONTENT: 204,

	/**
	 * 304 | Used for conditional GET calls to reduce band-width usage.
	 * If used, must set the Date, Content-Location, ETag headers to what they would have been on a regular GET call.
	 */
	NOT_MODIFIED: 304,

	/**
	 * 400 | The request was invalid.
	 */
	BAD_REQUEST: 400,

	/**
	 * 401 | The request did not include an authentication token or the authentication token was expired.
	 */
	UNAUTHORIZED: 401,

	/**
	 * 403 | The client did not have permission to access the requested resource.
	 */
	FORBIDDEN: 403,

	/**
	 * 404 | The requested resource was not found.
	 */
	NOT_FOUND: 404,

	/**
	 * The HTTP method in the request was not supported by the resource. For example, the DELETE method cannot be used with the Agent API.
	 */
	METHOD_NOT_ALLOWED: 405,

	/**
	 * 409 | The request could not be completed due to a conflict. For example,
	 * POST ContentStore Folder API cannot complete if the given file or folder name already exists in the parent location.
	 */
	CONFLICT: 409,

	/**
	 * 500 | The request was not completed due to an internal error on the server side.
	 */
	INTERNAL_SERVER_ERROR: 500,

	/**
	 * 503 | The server was unavailable.
	 */
	SERVICE_UNAVAILABLE: 503,
});

exports.Roles = Object.freeze({
	'Super Admin': 11,
	Admin: 12,
	'Team Manager': 13,
	'Team Member': 14,
	Client: 15,
});
