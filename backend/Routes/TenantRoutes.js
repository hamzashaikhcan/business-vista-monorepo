const router = require('express').Router();
const tenantController = require('../controllers/TenantController');

router.get('/', async (req, res) => {

	console.log('IN => v1/auth/tenants/');

	const { result, error } = await tenantController.listTenant();

	if (error) {
		res.status(error.status).json(error.message);
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}

});

router.get('/:id', async (req, res) => {

	const id = req.params.id;

	const { result, error } = await tenantController.getTenant(id);

	if (error) {
		res.status(error.status).json(error.message);
	} else if (result) {
		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}

});

router.patch('/:id', async (req, res) => {

	const id = req.params.id;

	const { email } = req.body;

	const { result, error } = await tenantController.updateTenant(id, email);

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

	const { result, error } = await tenantController.deleteTenant(id);

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		res.status(result.status).json({ message: result.message });
	} else {
		res.sendStatus(500);
	}

});

module.exports = router;