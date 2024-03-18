require('dotenv').config();
const mongoose = require('mongoose');

const mongdb = async () => {
    try {
        await mongoose.connect(process.env.Db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const collection = await mongoose.connection.db.collection("food_items");
        const data = await collection.find({}).toArray();
        console.log("Connected to MongoDB Atlas database");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas database:", error);
    }
};

module.exports = mongdb;
