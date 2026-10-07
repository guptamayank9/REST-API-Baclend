require("dotenv").config();

const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const errormiddleware = require('./middleware/errrormiddleware');

const app = express();




app.use(express.json());

//func call
connectDB();


app.get("/",(req,res)=>{
    res.json({
        message:"Welcome to the rest api",
    });
});


app.use('/api/users',userRoutes);
app.use("/api/auth", authRoutes);

//error handling middleware
app.use(errormiddleware);

// app.get("/api/users",(req,res)=>{
//     res.json({
//         message:"All Users",
//     });
// });

// app.post("/api/users",(req, res)=>{
//     console.log(req.body);

//     res.json({
//         message:"user created",
//         user:req.body,
//     });
// });

const PORT = 5000 || process.env.PORT;

app.listen(PORT,()=>{
    console.log("Server starting running at : ",  PORT);
});

