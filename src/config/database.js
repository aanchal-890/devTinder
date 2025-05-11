const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://aanchalsharma432000:w7TCXJUdl1voqYbU@namastedev.wq47eoa.mongodb.net/?retryWrites=true&w=majority&appName=Namastedev')
}

module.exports = connectDB;