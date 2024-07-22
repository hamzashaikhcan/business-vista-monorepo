exports.up = function (knex) {
	return knex.schema
		.createTable('Tenant', (t) => {
			t.increments();
			t.string('onboarding_status').notNullable().defaultTo('PENDING');
			t.timestamp('created_at').defaultTo(knex.fn.now());
			t.timestamp('updated_at').defaultTo(knex.fn.now());
		})
		.createTable('User', (t) => {
			t.increments();
			t.string('firstname').notNullable();
			t.string('lastname').notNullable();
			t.string('email').unique().notNullable();
			t.string('password').notNullable();
			t.string('company').notNullable();
			t.string('contact').unique().notNullable();
			t.boolean('is_active').notNullable().defaultTo(false);
			t.timestamp('created_at').defaultTo(knex.fn.now());
			t.timestamp('updated_at').defaultTo(knex.fn.now());
		})
		.createTable('Role', (t) => {
			t.increments();
			t.string('role_name').unique().notNullable();
		})
		.createTable('User_Role', (t) => {
			t.increments();
			t.integer('role_id')
				.references('id')
				.inTable('Role')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
				.notNullable();
			t.integer('user_id')
				.references('id')
				.inTable('User')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
				.notNullable();
			t.integer('tenant_id')
				.references('id')
				.inTable('Tenant')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
				.notNullable();
			// t.unique(['role_id', 'user_id', 'tenant_id']);
			t.timestamp('created_at').defaultTo(knex.fn.now());
			t.timestamp('updated_at').defaultTo(knex.fn.now());
		})
		.createTable('Role_Scope', (t) => {
			t.increments();
			t.integer('user_role_id')
				.references('id')
				.inTable('User_Role')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			t.integer('team_id').notNullable();
		})
		.createTable('Action', (t) => {
			t.increments();
			t.string('name').unique().notNullable();
		})
		.createTable('Object', (t) => {
			t.increments();
			t.string('name').unique().notNullable();
		})
		.createTable('Permission', (t) => {
			t.increments();
			t.string('object_name')
				.references('name')
				.inTable('Object')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			t.string('action_name')
				.references('name')
				.inTable('Action')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		})
		.createTable('Permission_Assignment', (t) => {
			t.increments();
			t.integer('permission_id')
				.references('id')
				.inTable('Permission')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			t.integer('role_id')
				.references('id')
				.inTable('Role')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			t.unique(['role_id', 'permission_id']);
		})
		.createTable('StripeProduct', (t) => {
			t.string('id').primary();
			t.string('name').notNullable().unique();
			t.boolean('is_public').notNullable().defaultTo(false);
			t.boolean('is_active').notNullable().defaultTo(true);
			t.timestamps(true, true, false);
		})
		.createTable('StripePricing', (t) => {
			t.string('id').primary();
			t.string('stripe_product_id').notNullable().references('id').inTable('StripeProduct').onUpdate('CASCADE').onDelete('CASCADE');
			t.string('group_key').notNullable();
			t.decimal('price_per_unit', 8, 2).notNullable();
			t.boolean('is_recurring').notNullable().defaultTo(true);
			t.string('interval');
			t.integer('trial_period_days');
			t.integer('allowed_users');
			t.integer('payment_threshold');
			t.integer('alert_threshold');
			t.boolean('is_active').notNullable().defaultTo(true);
		})
		.createTable('Subscription', (t) => {
			t.increments();
			t.string('stripe_pricing_id').notNullable().references('id').inTable('StripePricing').onUpdate('CASCADE').onDelete('CASCADE');
			t.integer('tenant_id').notNullable().references('id').inTable('Tenant').onDelete('CASCADE').onUpdate('CASCADE');
			t.string('status').notNullable();
			t.string('stripe_customer_id').unique();
			t.string('stripe_subscription_id').unique();
			t.boolean('alert_status').notNullable();
			t.string('expires_at').notNullable();
		});
	// .createTable('Subscription', (t) => {
	// 	t.increments();
	// 	t.integer('package_id').notNullable();
	// 	t.string('status').notNullable().defaultTo('pending');
	// 	t.integer('tenant_id')
	// 		.references('id')
	// 		.inTable('Tenant')
	// 		.onDelete('CASCADE')
	// 		.onUpdate('CASCADE');
	// 	t.string('stripe_customer_id').unique();
	// 	t.string('stripe_subscription_id').unique();
	// 	t.string('expires_at').notNullable();
	// 	t.timestamp('created_at').defaultTo(knex.fn.now());
	// 	t.timestamp('updated_at').defaultTo(knex.fn.now());
	// });
};
exports.down = function (knex) {
	return knex.schema
		.dropTable('Subscription')
		.dropTable('StripePricing')
		.dropTable('StripeProduct')
		.dropTable('Permission_Assignment')
		.dropTable('Permission')
		.dropTable('Object')
		.dropTable('Action')
		.dropTable('Role_Scope')
		.dropTable('User_Role')
		.dropTable('Role')
		.dropTable('User')
		.dropTable('Tenant');
};
