const UserModel = require('../models/user-model');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserController = {

    registerUser : async function ( req, res) {
        const { userName , password } = req.body;
        try {
            let user = await UserModel.findOne({userName});
            if(user) {
                return res.status(400).json({ success:false ,message : 'User already registered'});
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await UserModel.create({
                userName : userName,
                password : hashedPassword
            })
            const token = jwt.sign({ id : newUser._id} , process.env.JWT_SECRET , { expiresIn : "1h"});
            res.cookie("accessToken" , token , {httpOnly : true}).status(201).json({ 
                userName : newUser.userName,
                message : 'User registeration successful!'});
        }
        catch(error){
            return res.status(500).json({ message : error.message});
        }
    }
};

module.exports = UserController;