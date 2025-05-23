const express = require('express');
const connectDB = require ('./config/database');
const app = express();
const User = require('./config/UserModel');

app.use(express.json());

app.post('/signup', async (req,res)=>{
    //console.log('anchal');

    //console.log(req.body);
    const userdetails = new User(req.body)
    try{
        await userdetails.save();
        res.send('User saved successfully');
    }catch(err){
        console.error(err);
        res.status(500).send('Error saving user');  
    }
})

app.post('/user', async (req,res)=>{
    const email = req.body.emailId;
    // console.log('email:',email);
    try{
        const users = await User.findOne({email : email});
        // console.log('user:',users.length);
        // console.log('user:',users);
        if(users){
            res.send(users);
        }else{
            res.status(404).send('User not found');
        }
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
