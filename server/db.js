require('dotenv').config();
const mongoose = require('mongoose');
 const mongdb=  async ()=> {
 try {
    await mongoose.connect(process.env.Db);
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('Error connecting to MongoDB:');
}
 }
 
 module.exports= mongdb;