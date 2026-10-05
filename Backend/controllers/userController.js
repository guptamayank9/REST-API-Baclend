const User = require('../models/User');

const getUser = async (req, res) => {
    try {

        const users = await User.find();

        res.status(200).json(users);
        
    } catch (error) {
        
        console.error(error.message);
        res.status(500).json({
            message:"Failed to fetch user",
        });
    }
};

const getUserById = async (req, res) => {
    
    try {
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                message:"User not Found",
            });
        }

        res.status(200).json(user);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message:"Failed to fetch user",
        });
    }
};

const createUser = async (req, res) => {
    try {
      
        const {name,email,age} = req.body;

        const user = await User.create({name,email,age});

       
        res.status(201).json(user);


        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message:"Failed to create user",
        });
    }
};

const updateUser = async (req, res) => {
    
    try {

        const {name ,email,age}  = req.body;

        const user = await User.findByIdAndUpdate(req.params.id,{user,email,age},{new:true,runValidators:true});

        if(!user){
            return res.status(400).json({
                message:"User not found",
            });
        };

        res.status(200).json(user);

        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message:"Failed to update user",
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user){
            return res.status(400).json({
                message:"User not Found"
            });
        }
        
        res.status(201).json({
            message:"User deleted Successfully",
        });

    } catch (error) {
         console.error(error.message);
        res.status(500).json({
            message:"Failed to delete user",
        });
    }
}

module.exports={
    getUser,getUserById,createUser,updateUser,deleteUser,
}