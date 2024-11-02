// models/Attendance.js
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Attendance = sequelize.define('Attendance', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:true,
        primaryKey:true,
        autoIncrement:true
    },
    studentName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false // "Present" or "Absent"
    },
});

module.exports = Attendance;
