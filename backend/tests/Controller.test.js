const dbConfig = require('./../database/DatabaseConfig');
const authController = require('../controllers/AuthController');
const userRoles = require('../controllers/RoleAssignmentController');
const userController = require('../controllers/UserController');
const tenantController = require('../controllers/TenantController');
// const subscriptionController = require('../controllers/SubscriptionPackageController');
// const stripeManager = require('../utilities/StripeManager');

// dbConfig.initializeDB();

function fakeEmail() {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var charactersLength = characters.length;
	for (var i = 0; i < 8; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	result = result.toLowerCase();
	return result + '@venturenox.com';
}

const WEB_ORIGIN = 'http://localhost:3000';
// const STRIPE_PACKAGE_ID = 'sub_1KJZjGAyXQIqWcsj0T5SKh7x';

let users = {
	id: 10002,
	user_id: 10002,
	tenant_id: 10002,
	image:
		'https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg',
	name: 'Hamza Zahid',
	email: fakeEmail(),
	password: 'Hamza@#123',
	activation_token: '',
	access_token: '',
	refresh_token: '',
	role_id: 12,
	team_id: 2,
	user_role_id: 0,
	user_scope_id: 0,
};

// let package_info = {
// 	id: 0,
// 	name: 'Hamza Zahid',
// 	pricing_id: 'price_1KEVS5AyXQIqWcsjKotkkhWK',
// 	coupon: '',
// };

beforeAll(async () => {
	dbConfig.initializeDB();
});

afterAll(async (done) => {
	dbConfig.destroyKnex();
	await done();
});

describe('POSTIVE TEST CASES', () => {
	describe('BASIC AUTH', () => {
		it('Should register and output json object with success request status code', async () => {
			const { result } = await authController.register(
				users.email,
				users.password,
				users.name,
				'',
				'',
			);

			if (result) {
				users.id = result.data.user_id;
				users.user_id = result.data.user_id;
				users.tenant_id = result.data.tenant_id;
				users.activation_token = result.data.activation_token;
			}

			expect(result).toMatchObject({ status: 201 });
		});

		it('Should login and output json object with success request status code', async () => {
			const { result } = await authController.login(
				users.email,
				users.password,
			);
			users.refresh_token = result.message.refresh_token;

			expect(result).toMatchObject({ status: 200 });
		});

		it('Should refresh token and output json object with success request status code', async () => {
			const { result } = await authController.refreshToken(users.refresh_token);
			expect(result).toMatchObject({ status: 200 });
		});
	});

	describe('USER ROLES', () => {
		it('Should assign new role and output json object with success request status code', async () => {
			const { result } = await userRoles.assignRole(
				{
					user_id: users.id,
					role_id: 12,
					team_id: 2,
				},
				users.tenant_id,
			);
			users.user_role_id = result.data.role_scopes.user_role_id;
			users.user_scope_id = result.data.role_scopes.id;
			users.team_id = result.data.role_scopes.team_id;

			expect(result).toMatchObject({ status: 201 });
		});

		it('Should get all user roles and output json object with success request status code', async () => {
			const { result } = await userRoles.listRole(users.tenant_id);

			expect(result).toMatchObject({ status: 200 });
		});

		it('Should get all child user roles and output json object with success request status code', async () => {
			const { result } = await userRoles.getChild(
				{ id: users.id, tenant_id: users.tenant_id },
				'[roles,role_scopes]',
			);

			expect(result).toMatchObject({ status: 200 });
		});
		// comment of because only use function
		// it('Should update user roles and output json object with success request status code', async () => {
		// 	const { result } = await userRoles.updateRole([users], users.tenant_id);

		// 	expect(result).toMatchObject({ status: 200 });
		// });

		it('Should update bulk user roles and output json object with success request status code', async () => {
			const { result } = await userRoles.updateUserTeams(
				[users],
				users.tenant_id,
			);

			expect(result).toMatchObject({ status: 200 });
		});
	});

	describe('USERS', () => {
		it('Should add new user and output json object with success request status code', async () => {
			const { result } = await userController.addUsers(
				fakeEmail(),
				users.tenant_id,
				users.role_id,
				users.team_id,
				users.name,
				users.image,
			);

			expect(result).toMatchObject({ status: 201 });
		});

		it('Should list all users and output json object with success request status code', async () => {
			const { result } = await userController.listUsers(users.tenant_id, {});

			expect(result).toMatchObject({ status: 200 });
		});

		it('Should update user and output json object with success request status code', async () => {
			const { result } = await userController.updateUser(
				users.id,
				users,
				users.tenant_id,
			);

			expect(result).toMatchObject({ status: 200 });
		});

		it('Should list specific user and output json object with success request status code', async () => {
			const { result } = await userController.getUser(
				users.tenant_id,
				users.id,
			);

			expect(result).toMatchObject({ status: 200 });
		});

		it('Should list all tenants and output json object with success request status code', async () => {
			const { result } = await tenantController.listTenant();

			expect(result).toMatchObject({ status: 200 });
		});
	});

	describe('ACCOUNTS', () => {
		it('Should activate account and output json object with success request status code', async () => {
			console.log("USER'S DATA => ", users);

			const { result, error } = await authController.activateUser(
				users.activation_token,
			);
			console.log(
				'ACCOUNT ACTIVE RESULT => ',
				result,
				'ACCOUNT ACTIVE ERROR => ',
				error,
			);
			expect(result).toMatchObject({ status: 200 });
		});

		it('Should get activation link and output json object with success request status code', async () => {
			const { result } = await authController.requestActivationToken(
				WEB_ORIGIN,
				users.email,
			);

			expect(result).toMatchObject({ status: 200 });
		});

		it('Should update user and output json object with success request status code', async () => {
			const { result } = await authController.requestResetPassword(
				WEB_ORIGIN,
				users.email,
			);

			expect(result).toMatchObject({ status: 200 });
		});
	});

	describe('SUBSCRIPTIONS', () => {
		// it('Should add subscription packages and output json object with success request status code', async () => {
		// 	const { result } = await stripeManager.createStripeSubscription(
		// 		package_info,
		// 		users,
		// 	);

		// 	console.log(
		// 		'NEW SUBSCRIPTION RESULT => ',
		// 		JSON.stringify(result.data.subscription.result.data.id),
		// 	);
		// 	package_info.id = result.data.subscription.result.data.id;
		// 	expect(result).toMatchObject({ status: 200 });
		// });
		// it('Should list subscription packages and output json object with success request status code', async () => {
		// 	const { result } = await subscriptionController.listSubscriptions(
		// 		users.tenant_id,
		// 		{},
		// 	);
		// 	expect(result).toMatchObject({ status: 200 });
		// });
		// it('Should get specific subscription packages and output json object with success request status code', async () => {
		// 	const { result } = await subscriptionController.getSubscription(
		// 		package_info.id,
		// 		users.tenant_id,
		// 	);
		// 	expect(result).toMatchObject({ status: 200 });
		// });

		// it('Should get package detail and output json object with success request status code', async () => {
		// 	const { result } = await stripeManager.retrieveStripeSubscription(
		// 		STRIPE_PACKAGE_ID,
		// 	);
		// 	expect(result).toMatchObject({ status: 200 });
		// });

		// it('Should update package detail and output json object with success request status code', async () => {
		// 	const { result } = await subscriptionController.updateSubscription(
		// 		package_info.id,
		// 		{ pricing_id: 'price_1KJu4qAyXQIqWcsjlH5qAIb6', status: 'pending' },
		// 	);
		// 	expect(result).toMatchObject({ status: 200 });
		// });
	});

	describe('DELETE DATA', () => {
		// it('Should delete package detail and output json object with success request status code', async () => {
		// 	const { result } = await subscriptionController.deleteSubscription(
		// 		package_info.id,
		// 	);
		// 	expect(result).toMatchObject({ status: 200 });
		// });

		it('Should delete user roles and output json object with success request status code', async () => {
			const { result } = await userRoles.removeTeamRole(
				users.id,
				users.tenant_id,
				users.role_id,
				users.team_id,
			);

			expect(result).toMatchObject({ status: 200 });
		});

		it('Should delete USER and output json object with success request status code', async () => {
			const { result } = await userController.deleteUser(users.id, {
				tenant_id: users.tenant_id,
			});

			expect(result).toMatchObject({ status: 200 });
		});
	});
});

describe('NEGATIVE TEST CASES', () => {
	describe('BASIC AUTH', () => {
		it('Should not register with INVALID EMAIL and output json object with success request status code', async () => {
			const { error } = await authController.register(
				'ABC',
				users.password,
				users.name,
				'',
				'',
			);

			expect(error).toMatchObject({ status: 400 });
		});

		it('Should not register with INVALID PASSWORD and output json object with success request status code', async () => {
			const { error } = await authController.register(
				users.email,
				'hamza',
				users.name,
				'',
				'',
			);

			expect(error).toMatchObject({ status: 400 });
		});

		it('Should not register with USER ALREADY EXISTS and output json object with success request status code', async () => {
			await authController.register(
				users.email,
				users.password,
				users.name,
				'',
				'',
			);

			const { error } = await authController.register(
				users.email,
				users.password,
				users.name,
				'',
				'',
			);

			expect(error).toMatchObject({ status: 400 });
		});

		it('Should NOT LOGIN with INVALID PASSWORD and output json object with success request status code', async () => {
			const { error } = await authController.login(users.email, 'hamza');

			expect(error).toMatchObject({ status: 400 });
		});

		it('Should NOT REFRESH TOKEN and output json object with success request status code', async () => {
			const { error } = await authController.refreshToken('');
			expect(error).toMatchObject({ status: 401 });
		});
	});
	describe('USER ROLES', () => {
		it('Should NOT ASSING NEW ROLE and output json object with success request status code', async () => {
			const { error } = await userRoles.assignRole(
				{
					user_id: users.id,
					role_id: 18,
					team_id: 0,
				},
				users.tenant_id,
			);

			expect(error).toMatchObject({ status: 404 });
		});
	});
});
