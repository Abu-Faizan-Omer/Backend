// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');


const studentsRoutes=require("./routes/students")

const PORT = process.env.PORT || 3000;



app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


// Routes here

app.use("/",studentsRoutes)


// Server start karo
sequelize
.sync()
.then(() =>{
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
})
.catch(err => {
    console.error("Database connection failed:", err)
})


