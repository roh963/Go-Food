const express = require('express');
const router = express.Router();

// Endpoint to get food data
router.post('/foodData', (req, res) => {
    try {
        // Assuming global variables food_items and food_Category are defined elsewhere
        const { food_items, food_Category } = global;
        console.log(food_items, food_Category);
        res.send([food_items, food_Category]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
