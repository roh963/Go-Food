require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.Port;
const mongodb = require("./db");
mongodb();

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port,()=>{
    console.log(`listen at port ${port}`);
})