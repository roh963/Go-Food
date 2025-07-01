require('dotenv').config();
global.foodData = require('./db')(function call(err, data, CatData) {
  if(err) console.log(err);
  global.foodData = data;
  global.foodCategory = CatData;
})
const jwt = require('jsonwebtoken');
const express = require('express')
const app = express()
const port = process.env.Port;
const fport = process.env.fPort;
const mongodb = require("./db");
const createuser = require("./routes/createuser")
const displayuser = require("./routes/Display")
const orderuser = require("./routes/Order")
mongodb();
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",fport),
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next()

})
app.use(express.json());
app.use("/api",createuser)
app.use("/api",displayuser)
app.use("/api",orderuser)

app.get('/', (req, res) => {
  res.send('hello world')
})


app.listen(port,()=>{
    console.log(`listen at port ${port}`);
})