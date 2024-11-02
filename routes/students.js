const express=require("express")
const router=express.Router()

const Controller=require("../controllers/students")

// Store attendance data
router.post('/attendance',Controller.post);

// Fetch attendance by date
router.get('/attendance',Controller.get);

// Fetch attendance summary for a month
router.get('/attendance/summary', Controller.getMonthlySummary);


module.exports=router