const express = require('express');
const router = express.Router();
const User = require("../model/User");

router.post("/createuser",async(req,res)=>{
    try {
        await User.create({
            name:req.body.name,
            password:req.body.password,
            email:req.body.email,
            location:req.body.location
        })
        res.json({success:true})
    } catch (e) {
        res.json({success:false});
        console.log(e);

    }
})

module.exports = router;