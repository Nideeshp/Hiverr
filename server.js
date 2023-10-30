const express= require('express');
const connectedDB = require('./config/dbconnection');
const app = express()
require('dotenv').config();
app.use(express.json())
const port=process.env.PORT || 8001
connectedDB()


app.use('/',(req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})








