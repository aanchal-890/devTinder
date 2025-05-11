const express = require('express');

const app = express();


// app.use((req,res) => {
//     res.send('Hello World!')
// })

//adding route to the app to handle differnt requests differntly

// NOTE : the order of the routes matters, the first route that matches will be used
// app.use() will match all the Http methods (GET, POST, PUT, DELETE, etc.)
// app.get() will match only the GET method
// app.post() will match only the POST method

// app.use('/', (req, res) => { //anything that comes  after / will be handled by this route
//     res.send('Hello World!')
// })
// app.use("/test",(req,res) => {//anything that comes  after /test will be handled by this route
//     res.send('accesed / route')
// })
// we can use patterns also
// ab+c =abbc,abbbc,abbbbc
// ab*c =here * means anything can replace *
// ab?c =Here it means b is optional
// a(bc)?d = Here bc is optional

// app.get('/user', (req, res) => { 
//   res.send({'firtsName':'John', 'lastName':'Doe'})
// })
// app.post('/user', (req, res) => { 
//   res.send('created user')
// })
// app.delete('/user', (req, res) => { 
//   res.send('deleted user')

// })
// const authadmin = (req,res,next)=>{ //middleware function
//   const token = 'xyz'
//   if(token==='xyz')
//   {
//     console.log('authenticating user...')
//     next(); //call the next middleware function in the stack
//   }else{
//     res.status(401).send('unauthorized user')
//   }

// }
// const authuser = (req,res,next)=>{ //middleware function
//   const token = 'abc'
//   if(token==='abc')
//   {
//     console.log('authenticating user...')
//     next(); //call the next middleware function in the stack
//   }else{
//     res.status(401).send('unauthorized user')
//   }

// }

// app.use('/admin/login',authadmin,(req,res)=>{
//     res.send('admin login page')
// })
// app.use('/admin/data',authadmin,(req,res)=>{
//   res.send('admin data page')
// })

// app.use('/user/login',(req,res)=>{
//   res.send('user login page')
// })
// app.use('/user/data',authuser,(req,res)=>{
// res.send('user data page')
// })


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});