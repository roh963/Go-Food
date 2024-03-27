const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../model/User");
const EmailVal = body('email').isEmail();
const NameVal = body('name').isLength({ min: 5 });
const PassVal = body('password').isLength({ min: 5 });
const jwtsecret = "MyNameIsRohanMehra";
const axios = require('axios');
const fetch = require("../middleware/fetchdetail");

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Route to create a new user
router.post("/createuser", [EmailVal, NameVal, PassVal], async (req, res) => {
    try {
        const { name, email, location } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await User.create({ name, email, password: hashedPassword, location });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

// Route to login a user
router.post("/loginuser", [EmailVal, PassVal, handleValidationErrors], async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ errors: "Invalid email or password" });
        }
        const authToken = jwt.sign({ user: { id: user.id } }, jwtsecret);
        res.json({ success: true, authToken });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

// Route to get user details
router.post('/getuser', fetch, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// Route to get location details
router.post('/getlocation', async (req, res) => {
    try {
        const { lat, long } = req.body.latlong;
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=74c89b3be64946ac96d777d08b878d43`);
        const locationDetails = response.data.results[0].components;
        const { village, county, state_district, state, postcode } = locationDetails;
        const location = `${village}, ${county}, ${state_district}, ${state}\n${postcode}`;
        res.send({ location });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
