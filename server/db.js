require('dotenv').config();
const mongoose = require('mongoose');

const mongdb = async () => {
    try {
        await mongoose.connect(process.env.Db);
        const foodItems = await mongoose.connection.db.collection("food_items");
        const data = await foodItems.find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("food_Category");
        const catdata = await foodCategory.find({}).toArray();
         global.food_items = data;
         global.food_Category = catdata;

        console.log("Connected to MongoDB Atlas database");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas database:", error);
    }
};

module.exports = mongdb;
