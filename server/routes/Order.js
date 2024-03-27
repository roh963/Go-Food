const express = require('express');
const router = express.Router();
const Order = require("../model/Order");

// Endpoint to store order data
router.post('/orderData', async (req, res) => {
    try {
        const { order_data, order_date, email } = req.body;
        order_data.unshift({ Order_date: order_date });

        let existingOrder = await Order.findOne({ 'email': email });

        if (!existingOrder) {
            await Order.create({
                email: email,
                order_data: [order_data]
            });
        } else {
            await Order.findOneAndUpdate(
                { email: email },
                { $push: { order_data: order_data } }
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Endpoint to retrieve order data
router.post('/myOrderData', async (req, res) => {
    try {
        const { email } = req.body;
        let existingOrder = await Order.findOne({ 'email': email });
        res.json({ orderData: existingOrder });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
