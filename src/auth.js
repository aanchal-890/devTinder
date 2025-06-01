const jwt = require('jsonwebtoken');
const User = require('./config/UserModel'); // Assuming User is a Mongoose model for user data

const UserAuth = async (req, res, next) => {
    try{
        const{token} = req.cookies; // Extract token from cookies
        if(!token){
            return res.status(401).send('Unauthorized: No token provided');
        }
        const decoded = jwt.verify(token, "devtinder@123"); // Verify the token using the secret key
        if(!decoded){
            return res.status(401).send('Unauthorized: Invalid token');
        }
        const {_id} = decoded; // Extract user ID from the decoded token
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send('User not found');
        }
        console.log('userauth user::', user);
        req.user = user;
        next();

    }catch(err){

        console.error(err);
        res.status(400).send('Internal Server Error');
    }
}

module.exports ={UserAuth};