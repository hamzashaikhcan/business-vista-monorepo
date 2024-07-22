const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const { crossOriginResource } = require('./utilities/Middleware');
const dbConfig = require('./database/DatabaseConfig');
// const subscriptionWebhookRoutes = require('./routes/SubscriptionWebhookRoutes');

// const { webhookCheck } = require('./utilities/StripeManager');
const router = require('./routes');


const app = express();
//Initialize Database
dbConfig.initializeDB();


// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(crossOriginResource);

//app routes
// app.use(
// 	'/v1/subscription_webhooks',
// 	express.raw({ type: 'application/json' }),
// 	webhookCheck,
// 	subscriptionWebhookRoutes,
// );
// parse application/json
// app.use(express.json());

app.use(
	express.json({
		verify: (req, res, buf) => {
			req.rawBody = buf;
		},
	}),
);

app.use(router);

//Configure app on port
app.listen(process.env.PORT, () => {
	console.clear()
	console.log('Server Started');

	// Kafka consumer
	// startConsumer(streamProcessor, {
	// 	topic: process.env.KAFKA_EVENT_TOPIC,
	// 	group: process.env.KAFKA_AUTH_GROUP_ID,
	// 	client: process.env.KAFKA_AUTH_EVENT_CLIENT,
	// })
	// 	.then(() => {
	// 		console.log('Kafka Consumer started for event topic.');
	// 	})
	// 	.catch((err) => {
	// 		console.error(`Kafka Consumer Error:${err}`);
	// 		process.exit(1);
	// 	});
});
