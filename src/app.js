
const express = require('express');
const connectDB = require ('./config/database');
const app = express();
const User = require('./config/UserModel');//User is the Mongoose model that represents your user collection in MongoDB
const {Validatorfunc} = require('./config/utils'); //Validator is a function that validates the user input
const bcrypt = require('bcrypt'); //bcrypt is a library for hashing passwords
const jwt = require('jsonwebtoken'); //jsonwebtoken is a library for creating and verifying JSON Web Tokens
const cookieParser = require('cookie-parser'); //cookie-parser is a middleware for parsing cookies
const {UserAuth} = require('./auth')

app.use(express.json());// This means that whenever I get data i want to pass it in json format
app.use(cookieParser()); // This means that I want to use cookie-parser middleware to parse cookies in the request

app.post('/signup', async (req,res)=>{
try{
    //console.log('anchal');

    //console.log(req.body);
    Validatorfunc(req);
    //const userdetails = new User(req.body);
    const {firstName, lastName, email, password} = req.body;
    const passhash = await bcrypt.hash(password,10);
    const userdetails = new User({firstName, lastName, email, password:passhash});
        await userdetails.save();
        res.send('User saved successfully');
    }catch(err){
        console.error(err);
        res.status(400).send(err);  
        //res.send(err.message);
    }
})

app.post('/login',async(req,res)=>{
    try{
            const {email, password} = req.body;

        const user = await User.findOne({email:email});
        console.log('user:',user.password);
        if(!user){
            return res.status(404).send('User not found');
        }
        // const ismatch = await bcrypt.compare(password,user.password);
        const ismatch =await user.isPasswordMatch(password); // Use the method defined in User model to compare passwords
        if(ismatch){
            // const token = jwt.sign({_id:user._id},"devtinder@123",{expiresIn:'1d'}); // Create a token with user ID and secret key, expires in 1 hour
            const token = await user.getJWT(); // Use the method defined in User model to get the JWT
            console.log('token:',token);
            res.cookie('token', token, {httpOnly: true, secure: true, expires:new Date(Date.now()+8*3600000)}); // Set the token as a cookie

            res.status(200).send('Successfully logged in');
        }else{
            res.status(400).send('Invalid credentials');
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Error logging in');  
    }
})

app.post('/user',UserAuth, async (req,res,next)=>{
    // console.log('email:',email);
    try{
            const email = req.body.emailId;

        // const {token} = req.cookies;
        // if(!token){
        //     return res.status(401).send('Unauthorized: No token provided');
        // }
        // const decoded = jwt.verify(token, "devtinder@123");;
        // console.log('decoded:',decoded);
        // if(!decoded){
        //     return res.status(401).send('Unauthorized: Invalid token');
        // }
        // const {_id} = decoded;
        // const user =await User.findById(_id);
        const user = req.user; //attached by UserAuth middleware in req handler.
console.log('user:',req.user);
res.send(user);
// console.log('email:',email);
//         if(email!=user.email){
//             return res.status(403).send('Forbidden: You are not allowed to access this user');
//         }
//         const users = await User.findOne({email : email});
//         // console.log('user:',users.length);
//         // console.log('user:',users);
//         if(users){
//             res.send(users);
//         }else{
//             res.status(404).send('User not found');
//         }
    }catch(err){
        console.error(err);
        res.status(404).send('Error finding user');  
    }
});

app.post('/feed', async (req,res)=>{
    try{
        const user = await User.find({});
        res.status(200).send(user);
    }catch(err){
        console.error(err);
        res.status(404).send('Error finding user');  
    }
});

app.delete('/user', async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete({_id:req.body.userId}); //this returns the user that to be deleted otherwise null if not found
        console.log('id:',id);
        res.status(200).send('User deleted successfully');
    }catch(err){    
        console.error(err);
        res.status(404).send('Error deleting user');  
    }
});

app.patch('/user',async (req,res)=>{
    const userid = req.body._id;
    const data =req.body;
    console.log('userid:',userid);
    console.log('data:',data);
    try{
        const user = await User.findByIdAndUpdate({_id:userid},data,{returnDocument:'after'});
        console.log('user:',user);
        res.send('User updated successfully');
    }catch(err){
        console.error(err);
        res.status(404).send('Error updating user');  
    }
})

connectDB().then(()=>{
    console.log('MongoDB connected successfully');  
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
      });
}).catch((err)=>{
    console.error('MongoDB connection error:', err);
});
