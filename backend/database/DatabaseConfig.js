const Knex = require('knex');
const knexConfig = require('../knexfile');
const { Model } = require('objection');

//Knex Configuration
const knex = Knex(knexConfig);

const initializeDB = function () {

	//Initialize knex Model
	Model.knex(knex);
	console.log("DataBase Connected");
};

const destroyKnex = function () {
	knex.destroy();
};

module.exports = { initializeDB, destroyKnex };