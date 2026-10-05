const express = require('express');

const {getUser, createUser, updateUser, deleteUser, getUserById} = require('../controllers/userController');

const router = express.Router();


router.get('/',getUser);

router.get('/:id',getUserById);

router.post('/',createUser);

router.put('/:id',updateUser);

router.delete('/:id',deleteUser);

module.exports=router;
