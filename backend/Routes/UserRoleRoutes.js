const router = require('express').Router();
const roleAssignmentController = require('../controllers/RoleAssignmentController');

router.get('/', async (req, res, next) => {
	const { tenant_id } = req.user;
	console.log(tenant_id);
	req.response = await roleAssignmentController.listRole(tenant_id, req.query);

	next();
	// if (error) {
	// 	res.status(error.status).json({ message: error.message });
	// } else if (result) {
	// 	res.status(result.status).json({ data: result.data });
	// } else {
	// 	res.sendStatus(500);
	// }
});

router.post('/', async (req, res) => {
	const { tenant_id } = req.user;
	// const { user_id, role_id } = req.body;

	const { result, error } = await roleAssignmentController.assignRole(
		req.body,
		tenant_id,
	);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}
});

// router.patch('/', async (req, res) => {
// 	const { tenant_id } = req.user;

// 	const { result, error } = await roleAssignmentController.updateRole(
// 		req.body,
// 		tenant_id,
// 	);

// 	if (error) {
// 		res.status(error.status).json({ message: error.message });
// 	} else if (result) {
// 		res.status(result.status).json(result.data);
// 	} else {
// 		res.sendStatus(500);
// 	}
// });

router.delete('/', async (req, res) => {
	const { tenant_id } = req.user;
	const { user_id, role_id } = req.body;

	const { result, error } = await roleAssignmentController.removeRole(
		user_id,
		tenant_id,
		role_id,
	);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json({ message: result.message });
	} else {
		res.sendStatus(500);
	}
});

router.delete('/role', async (req, res) => {
	const { tenant_id } = req.user;
	const { user_id, role_id, team_id } = req.body;

	const { result, error } = await roleAssignmentController.removeTeamRole(
		user_id,
		tenant_id,
		role_id,
		team_id,
	);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json({ message: result.message });
	} else {
		res.sendStatus(500);
	}
});

router.get('/child', async (req, res, next) => {
	req.response = await roleAssignmentController.getChild(
		req.user,
		req.query.expand,
	);
	next();
});

router.get('/child/:id', async (req, res, next) => {
	const user_id = req.params.id;
	const { tenant_id } = req.user;
	req.response = await roleAssignmentController.getChildById(
		user_id,
		tenant_id,
		req.query.expand,
	);
	next();
});

router.patch('/team_update', async (req, res, next) => {
	const { tenant_id } = req.user;
	req.response = await roleAssignmentController.updateUserTeams(
		req.body,
		tenant_id,
	);
	next();
});

module.exports = router;
