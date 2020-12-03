const express = require('express');
const mongoose= require('mongoose');
const userRouter = require('./controllers/User'); 
const blogPostRouter = require('./controllers/BlogPost');
require('dotenv').config();

const app = express();
app.use(express.json());

const config={
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true
    
}

mongoose.connect(process.env.MONGODB_URI,config)
.then(
    ()=>{
        console.log("Successfully connected to MongoDB")
    }
)
.catch(err=>{
    console.log("Some problem occured")
})
//route for login
// app.post("/login",(request,response)=>{
//     const username = request.query.username;
//     const password=request.query.password;

//     if(username=="Chris" && password=="1234"){
//           res.send ("Login success");
//     }
// })

// app.get("/posts",(request,response)=>{
//     res.send()
// })


app.use('/user',userRouter);

app.use('/posts',blogPostRouter);

app.listen(process.env.PORT,()=>{
    console.log("My app is running on this server")
})

