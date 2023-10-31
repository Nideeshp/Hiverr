const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema= new Schema({
    name:{
        type:String,
        required:[true,'Please add a name']
    },
    email:{
        type:String,
        unique:true,
        Lowercase:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },


})


module.exports= mongoose.model('User',userSchema)


