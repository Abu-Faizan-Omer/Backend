// config/db.js
const  Sequelize  = require('sequelize');

// Connect to MySQL database
const sequelize = new Sequelize('attendance_db', 'root', 'F1@mysql', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
