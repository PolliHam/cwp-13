const Sequelize = require('sequelize');
const config = require('../config.json');
const db = require('../models')(Sequelize, config);
require('../data/insert')(db);
module.exports = db;