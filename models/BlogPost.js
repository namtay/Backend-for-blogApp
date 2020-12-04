const mongoose = require("mongoose");


const blogPostSchema = new mongoose.Schema({

    author:{
        type:String,
        required:true,
        maxlength:15,
        minlength:3,

    },
    title:{

        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    date:{
        type:String
    },
    upvotes:{
        type:Number
    },
    downvotes:{
        type:Number
    }
})

module.exports= mongoose.model("BlogPost",blogPostSchema);