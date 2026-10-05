require("dotenv").config();

const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

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

