const express= require('express');
const connectedDB = require('./config/dbconnection');
const verifyToken = require('./middleware/verifytoken');
const cookieParser= require('cookie-parser')
const app = express()
require('dotenv').config();
app.use(express.json())
const port=process.env.PORT || 8001
connectedDB()


app.use(verifyToken)


app.use('/',require('./routes/userroutes'))






app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})








