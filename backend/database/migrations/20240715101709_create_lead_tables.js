exports.up = function(knex) {
    return knex.schema
  
      // Create Lead_Statuses table
      .createTable('Lead_Statuses', table => {
          table.increments('id').primary();
          table.string('name');
          table.timestamp('created_at').defaultTo(knex.fn.now());
          table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
  
      // Create Lead_Profiles table
      .createTable('Lead_Profiles', table => {
          table.increments('id').primary();
          table.string('name');
          table.timestamp('created_at').defaultTo(knex.fn.now());
          table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
  
      // Create Leads table including current_step
      .createTable('Leads', table => {
          table.increments('id').primary();
          table.string('name');
          table.integer('profile_id').unsigned().references('id').inTable('Lead_Profiles').onDelete('CASCADE').onUpdate('CASCADE');
          table.integer('bd_id').unsigned().references('id').inTable('User').onDelete('CASCADE').onUpdate('CASCADE');
          table.integer('assignee_id').unsigned().references('id').inTable('User').onDelete('CASCADE').onUpdate('CASCADE');
          table.string('description');
          table.string('resume');
          table.integer('current_step').unsigned(); // Create this column during table creation
          table.integer('status').unsigned().references('id').inTable('Lead_Statuses').onDelete('CASCADE').onUpdate('CASCADE');
          table.timestamp('created_at').defaultTo(knex.fn.now());
          table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
  
      // Create Lead_Steps table
      .createTable('Lead_Steps', table => {
          table.increments('id').primary();
          table.string('name');
          table.integer('lead_id').unsigned().references('id').inTable('Leads').onDelete('CASCADE').onUpdate('CASCADE');
          table.timestamp('created_at').defaultTo(knex.fn.now());
          table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
  
      // Alter Leads table to add foreign key for current_step referencing Lead_Steps
      .then(() => knex.schema.table('Leads', table => {
          table.integer('current_step').unsigned().alter().references('id').inTable('Lead_Steps').onDelete('CASCADE').onUpdate('CASCADE');
      }));
  };
  
  exports.down = function(knex) {
    return knex.schema
      // First, alter 'Leads' to drop the foreign key constraint that references 'Lead_Steps'
      .table('Leads', function (table) {
        table.dropColumn('current_step'); // This drops the column and its constraints
      })
      // Then, it's safe to drop 'Lead_Steps' as no other objects depend on it
      .then(function () {
        return knex.schema.dropTableIfExists('Lead_Steps');
      })
      // Now, drop 'Leads' since it no longer references 'Lead_Steps'
      .then(function () {
        return knex.schema.dropTableIfExists('Leads');
      })
      // Continue with dropping the rest of the tables
      .then(function () {
        return knex.schema
          .dropTableIfExists('Lead_Profiles')
          .dropTableIfExists('Lead_Statuses');
      });
  };
  
  