const express = require('express');
const connectDB = require ('./config/database');
const app = express();
const User = require('./config/UserModel');


app.post('/signup', async (req,res)=>{
    const userdetails = new User({
        firstName: 'Ayush',
        lastName: 'Sharma',
        email: 'ayush@gmail.com',
        password: 'aanchal',
    })
    try{
        await userdetails.save();
        res.send('User saved successfully');
    }catch(err){
        console.error(err);
        res.status(500).send('Error saving user');  
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
