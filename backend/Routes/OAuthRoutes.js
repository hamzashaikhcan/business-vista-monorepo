const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/AuthController');

// require('./../strategies/PassportConfig');

router.get('/google', (req, res) => {

	passport.authenticate('google', { scope: ['email', 'profile'], state: req.headers.referer })(req, res);

});

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/error' }), async (req, res) => {

	const { result } = await authController.oauth(req.user.email, req.user.given_name, req.user.family_name);

	if (result) {
		res.redirect(`${req.user.redirectTo}oauth_success/${result.data.refresh_token}`);
	} else {
		res.redirect(`${req.user.redirectTo}oauth_error/You do not belong to this tenant`);
	}

});

router.get('/azure', (req, res) => {

	passport.authenticate('azure_ad_oauth2', { scope: ['email', 'profile'], state: req.headers.referer })(req, res);

});

router.get('/azure/callback', passport.authenticate('azure_ad_oauth2', { failureRedirect: '/error' }), async (req, res) => {

	const { result } = await authController.oauth(req.user.email, req.user.given_name, req.user.family_name);

	if (result) {
		res.redirect(`${req.user.redirectTo}oauth_success/${result.data.refresh_token}`);

	} else {
		res.redirect(`${req.user.redirectTo}oauth_error/You do not belong to this tenant`);
	}


});

router.get('/error', (req, res) => {
	res.redirect(`${req.user.redirectTo}/oauth_error/Some error occured`);
	// res.send('Invalid Request');
});

module.exports = router;