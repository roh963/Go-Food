require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.Port;
const mongodb = require("./db");
const createuser = require("./routes/createuser")
mongodb();

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use(express.json());
app.use("/api",createuser)

app.listen(port,()=>{
    console.log(`listen at port ${port}`);
})