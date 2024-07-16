module.exports = {

	client: 'pg',
	connection: {
		host: "localhost",
		user: "postgres",
		password: "postgres",
		database: "postgres",
		timezone: 'UTC',
	},

	migrations: {
		directory: __dirname + '/database/migrations',
	},
	seeds: {
		directory: __dirname + '/database/seeds',
	}
	
};
