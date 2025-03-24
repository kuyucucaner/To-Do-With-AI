const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    userName :{ type : String , trim : true , unique : true , required : true},
    password : { type: String , minlength : 8 ,required : true},
    createdAt : {type : Date , default : Date.now},
    updatedAt : {type : Date, default : Date.now },
});

userSchema.pre("save", async function ( next) {
    if(!this.isModified("password")){
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        this.updatedAt = Date.now();
        next();
    }
    catch(error){
        next(error);
    }
} );

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model("UserModel" , userSchema );

module.exports = UserModel;
