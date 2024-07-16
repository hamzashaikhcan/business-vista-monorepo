const router = require('express').Router();
const { sendResponse, authenticateToken, parseUser, stripeWebhookCheck } = require('../utilities/Middleware');
const authRoutes = require('./AuthRoutes');
const rbacRoutes = require('./RbacRoutes');
const userRoleRoutes = require('./UserRoleRoutes');
const roleRoutes = require('./RoleRoutes');
const stripeCustomerRoutes = require('./StripeCustomerRoutes');
const subscriptionRoutes = require('./SubscriptionRoutes');
const stripeProductRoutes = require('./StripeProductRoutes');
const stripeWebhookRoutes = require('./StripeWebhookRoutes');
const leadsRoutes = require('./LeadsRoutes');
const leadProfilesRoutes = require('./LeadProfilesRoutes');
const leadStatusesRoutes = require('./LeadStatusesRoutes');
const leadStepsRoutes = require('./LeadStepsRoutes');
const tenantRoutes = require('./TenantRoutes');
const userRoutes = require('./UserRoutes');
// const subscriptionPackageRoutes = require('./SubscriptionPackageRoutes');
// const subscriptionWebhookRoutes = require('./SubscriptionWebhookRoutes');


router.use('/v1/rbac', authenticateToken, rbacRoutes);
router.use('/v1/auth', authRoutes, sendResponse);
router.use('/v1/tenants', tenantRoutes, sendResponse);
router.use('/v1/users', parseUser, userRoutes, sendResponse);
router.use('/v1/roles', roleRoutes, sendResponse);
router.use('/v1/user_roles', parseUser, userRoleRoutes, sendResponse);
router.use('/v1/subscriptions', parseUser, subscriptionRoutes, sendResponse);
router.use('/v1/stripe_customers', parseUser, stripeCustomerRoutes, sendResponse);
router.use('/v1/stripe_products', stripeProductRoutes);
router.use('/v1/stripe_webhook', stripeWebhookCheck, stripeWebhookRoutes);
router.use('/v1/leads', leadsRoutes, sendResponse);
router.use('/v1/lead_profiles', leadProfilesRoutes, sendResponse);
router.use('/v1/lead_statuses', leadStatusesRoutes, sendResponse);
router.use('/v1/lead_steps', leadStepsRoutes, sendResponse);
// router.use('/v1/auth', subscriptionWebhookRoutes, sendResponse);




module.exports = router;