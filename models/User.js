const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        maxlength:15
    },
    lastName:{
        type:String,
        maxlength:15
    },
    email:{
        type:String,   
        required:true,
        lowercase:true,
        unique:true   
    },
    passwordHash:{
        type:String,      
        minlength:8
    }
})


module.exports= mongoose.model("User",userSchema);