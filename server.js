const express= require('express');
const app = express()
require('dotenv').config();
app.use(express.json())
const port=process.env.PORT || 8001

const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://nideeshnd313:3WsbNk3Mp5cYJCFm@cluster0.ca03c0z.mongodb.net/").then(()=>{
    console.log('Mongodb connected')
}).catch((err)=>console.log(err))

app.use('/',(req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})








