require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.Port;
const fport = process.env.fPort;
const mongodb = require("./db");
const createuser = require("./routes/createuser")
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

app.get('/', (req, res) => {
  res.send('hello world')
})


app.listen(port,()=>{
    console.log(`listen at port ${port}`);
})