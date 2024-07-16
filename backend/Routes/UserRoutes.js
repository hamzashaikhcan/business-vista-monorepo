const router = require('express').Router();
const userController = require('./../controllers/UserController');
// const { upload } = require('../utilities/Utility');

router.get('/', async (req, res) => {
	const { tenant_id } = req.user;

	const { result, error } = await userController.listUsers(
		tenant_id,
		req.query,
	);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json({ data: result.data });
	} else {
		res.sendStatus(500);
	}
});

router.get('/:id', async (req, res) => {
	const userId = req.params.id;
	const { tenant_id } = req.user;

	const { result, error } = await userController.getUser(tenant_id, userId);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}
});

router.post('/', async (req, res) => {
	const { tenant_id } = req.user;
	const { email, role_id, team_id, name, image } = req.body;

	const { result, error } = await userController.addUsers(
		email,
		Number(tenant_id),
		Number(role_id),
		Number(team_id),
		name,
		image,
	);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.message);
	} else {
		res.sendStatus(500);
	}
});

router.delete('/:id', async (req, res) => {
	const userId = req.params.id;

	const { result, error } = await userController.deleteUser(userId, req.user);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json({ message: result.message });
	} else {
		res.sendStatus(500);
	}
});

router.patch('/password', async (req, res) => {
	const { id } = req.user;
	const { password, new_password } = req.body;

	const { result, error } = await userController.updatePassword(
		id,
		password,
		new_password,
	);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json({
			message: result.message,
		});
	} else {
		res.sendStatus(500);
	}
});

router.patch('/:id', async (req, res) => {
	const { id } = req.params;
	// const { email, role_id, team_id } = req.body;
	const { tenant_id } = req.user;

	// const { result, error } = await userController.updateUser(id, email, role_id, tenant_id, team_id);
	const { result, error } = await userController.updateUser(
		id,
		req.body,
		tenant_id,
	);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json({
			message: result.message,
		});
	} else {
		res.sendStatus(500);
	}
});

// router.put('/switch_tenant', async (req, res) => {
// 	const user = req.user;
// 	const { new_tenant_id } = req.body;

// 	const request = await userController.switchTenantAccount(user, new_tenant_id);

// 	if (request.error) {
// 		res.status(request.error.status).json({
// 			message: request.error.message,
// 		});
// 	} else if (request.result) {
// 		res.status(request.result.status).json(request.result.message);
// 	} else {
// 		res.sendStatus(500);
// 	}
// });

router.delete('/', async (req, res) => {
	const { result, error } = await userController.multiDelete(
		req.body,
		req.user,
	);

	if (error) {
		res.status(error.status).json(error.message);
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}
});

router.get('/filter/management', async (req, res) => {
	const { result, error } = await userController.management_filter(req.user);

	if (error) {
		res.status(error.status).json(error.message);
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}
});

module.exports = router;
