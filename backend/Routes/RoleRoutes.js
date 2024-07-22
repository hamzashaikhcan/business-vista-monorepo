const router = require('express').Router();
const roleController = require('./../controllers/RoleController');

router.get('/', async (req, res) => {

	const { result, error } = await roleController.listRole();

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json({ data: result.data });
	} else {
		res.sendStatus(500);
	}

});

router.get('/:id', async (req, res) => {

	const id = req.params.id;

	const { result, error } = await roleController.getRole(id);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}

});

router.post('/', async (req, res) => {

	const { role_name } = req.body;
	const { result, error } = await roleController.addRole(role_name);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}

});

router.patch('/:id', async (req, res) => {

	const id = req.params.id;
	const { role_name } = req.body;

	const { result, error } = await roleController.updateRole(id, role_name);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json({ message: result.message });
	} else {
		res.sendStatus(500);
	}

});

router.delete('/:id', async (req, res) => {

	const id = req.params.id;
	const { result, error } = await roleController.deleteRole(id);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json({ message: result.message });
	} else {
		res.sendStatus(500);
	}

});

module.exports = router;