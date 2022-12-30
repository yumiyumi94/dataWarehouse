const Sequelize = require('sequelize');
const {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT} = require('../config');

const path = `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelize = new Sequelize(path,{ operatorsAliases: false});
sequelize.authenticate()
.then(()=> console.log('conectado a MYSQL'))
.catch((error)=>console.error('Error: ', error));

module.exports = sequelize;