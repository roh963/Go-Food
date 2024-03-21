const express = require('express');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../model/User");

const EmailVal = body('email').isEmail();
const NameVal = body('name').isLength({ min: 5 });
const PassVal = body('password').isLength({ min: 5 });

router.post("/createuser", [EmailVal, NameVal, PassVal], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            location: req.body.location
        });
        res.json({ success: true });
    } catch (e) {
        console.error(e);
        res.json({ success: false });
    }
});
router.post("/loginuser", [EmailVal, PassVal], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const email = req.body.email;
    try {
      const userdata =  await User.findOne({email})
        if (!userdata) {
            return res.status(400).json({ errors: "Try logging with correct credential" });
        }
        if (req.body.password !== userdata.password) {
            return res.status(400).json({ errors: "Try logging with correct credential" });
        }
        res.json({ success: true });

    } catch (e) {
        console.error(e);
        res.json({ success: false });
    }
});

module.exports = router;
