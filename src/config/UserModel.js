const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // bcryptjs is a library for hashing passwords

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
});

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id}, "devtinder@123", {expiresIn : '1d'});
    return token;

}

userSchema.methods.isPasswordMatch = async function(password){
    const user = this;
    const ismatch = await bcrypt.compare(password,user.password);
    return ismatch;
}

module.exports = mongoose.model('User', userSchema);