const router = require('express').Router();
const { StatusCode } = require('../utilities/KeyMaster');
const {
	mapMethodToAction,
	mapRequestPathToObject,
} = require('../utilities/Utility');
const rbacController = require('./../controllers/RbacController');

router.use('/check', async (req, res) => {
	const objectName = mapRequestPathToObject(req.path);
	const actionName = mapMethodToAction(req.method);

	const { result, error } = await rbacController.checkPermission(
		req.user.id,
		req.user.tenant_id,
		objectName,
		actionName,
	);

	// const subscription = await rbacController.getSubscriptionPackage(req.user.tenant_id);

	if (error) {
		res
			.status(StatusCode.FORBIDDEN)
			.json({ message: 'You do not have permission to access this resource' });
	} else if (result) {
		if (req.user) {
			req.user['role_scopes'] = result.data.role_scopes;
			req.user['role_id'] = result.data[0].role_id;
			res.setHeader('user', JSON.stringify(req.user));
		}

		// if (subscription.result && subscription.result.data) {
		// 	res.setHeader('package', JSON.stringify(subscription.result.data));
		// }

		res.sendStatus(result.status);
	} else {
		res.sendStatus(StatusCode.INTERNAL_SERVER_ERROR);
	}
});

module.exports = router;
