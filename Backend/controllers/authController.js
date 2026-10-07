const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const register = async (req, res) => {
    try {
        const {name, email ,password, age} = req.body;

        //check required fields
        if(!name || !email || !password){
            return res.status(404).json({
                message:"Name ,email and password are required"
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({
                message:"User already exists"
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,email, password:hashedPassword,age
        });

        res.status(201).json({
            message:"User already Successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.name,
                age:user.age
            }
        });


    } catch (error) {
        console.error(error.message);
        next();
    }
}

const login = async (req, res) => {
    try {
     
        const {email,password} = req.body;

        if(!email || !password){
            res.status(404).json({
                message:"mail and pssword are required"
            });
        }

        const user =await User.findOne({email});

        if(!user){
            res.status(401).json({
                message:"Invalid email and password "
            });
        }


        //compare passowrd
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                message:"Invalid email and password"
            });
        }
  

        //isme user ki id identify karnte hai
        const token = jwt.sign(
            {
            userId:user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
    );




        //login successfull

        res.status(200).json({
            message:"Login successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                age:user.age
            }
        });


        
    } catch (error) {
        console.error(error.message);
        next();

    }
}
module.exports={
    register,login,

};