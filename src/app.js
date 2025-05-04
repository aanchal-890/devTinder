const express = require('express');


const app = express();

// app.use((req,res) => {
//     res.send('Hello World!')
// })

//adding route to the app to handle differnt requests differntly

app.use('/', (req, res) => {
    res.send('Hello World!')
})
app.use("/test",(req,res) => {
    res.send('accesed / route')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});