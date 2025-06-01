const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://aanchalsharma432000:w7TCXJUdl1voqYbU@namastedev.wq47eoa.mongodb.net/?retryWrites=true&w=majority&appName=Namastedev')
    //the code is connecting to your MongoDB database using Mongoose.
    // It uses the provided connection string (which includes your username and password) to establish a connection to your MongoDB Atlas cluster.
    // The await keyword ensures that the connection is established before moving to the next line of code.
}

module.exports = connectDB;