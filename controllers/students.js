// controllers/students.js

const Attendance = require("../models/Attendence");


const { Op, Sequelize } = require("sequelize"); // Import Op and Sequelize

// Store attendance data
exports.post = async (req, res) => {
    try {
        const { date, students } = req.body; // students is an array of { studentName, status }
        const attendanceRecords = students.map(student => ({
            ...student,
            date,
        }));

        await Attendance.bulkCreate(attendanceRecords);
        res.json({ message: 'Attendance marked successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Fetch attendance by date
exports.get = async (req, res) => {
    try {
        const { date } = req.query;
        const records = await Attendance.findAll({ where: { date } });
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.getMonthlySummary = async (req, res) => {
    try {
        const { month, year } = req.query; // Expecting month (1-12) and year
        const records = await Attendance.findAll({
            where: {
                // Use Sequelize to filter by month and year
                date: {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), month),
                        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), year)
                    ]
                }
            }
        });

        const summary = {};
        const totalDays = records.length; // Total days attendance was marked

        records.forEach(record => {
            const studentName = record.studentName;

            if (!summary[studentName]) {
                summary[studentName] = { present: 0, total: totalDays }; // Initialize for each student
            }

            if (record.status === "Present") {
                summary[studentName].present += 1; // Increment present count
            }
        });

        // Calculate the percentage
        const result = Object.entries(summary).map(([studentName, { present, total }]) => ({
            studentName,
            present,
            total,
            percentage: ((present / total) * 100).toFixed(2) // Calculate percentage
        }));

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};