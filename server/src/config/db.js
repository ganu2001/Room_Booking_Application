const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = () => {
    // mongoose.connect(process.env.MONGODB_CONNECTION_STRING
    // ).then(() => {
    //   console.log('MongoDB connected successfully');
    // }).catch((err) => {
    //   console.error('MongoDB connection error:', err);
    //   setTimeout(connectDB, 5000); 
    // });
    mongoose.connect("mongodb://localhost:27017/room-booking"
    ).then(() => {
      console.log('MongoDB connected successfully');
    }).catch((err) => {
      console.error('MongoDB connection error:', err);
      setTimeout(connectDB, 5000); 
    });
  };

  connectDB();


module.exports = connectDB;