 const express = require('express');
 const router = require('express').Router();

 router.post('/foodData',(req,res)=>{
    try {
        console.log(global.food_items,global.food_Category);
        res.send([global.food_items,global.food_Category]);
    } catch (error) {
       console.error(error.message); 
    }
 })
 module.exports = router;