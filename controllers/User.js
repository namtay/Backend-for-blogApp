const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');


let BCRYPT_SALT_ROUNDS = 10;

userRouter.get('/',(request,response,next)=>{

    User.find({}).then(result=>{
        response.status(200).send(result)
        next();
    })
})

userRouter.post('/signup',async(request,response,next)=>{
    const {firstName,lastName,email,passwordHash} = request.body;
    if (firstName && lastName && email && passwordHash){

    bcrypt.hash(passwordHash,BCRYPT_SALT_ROUNDS)
    .then(function(hashedPassword) {          
        const newUser =  new User({
            firstName:firstName,
            lastName:lastName,
            email:email,
            passwordHash: hashedPassword       
        })
        newUser.save()
        console.log(newUser)
    })
    .then(function() {
        response.status(201).send("Saved successfully")
    })
    .catch(function(error){
        console.log("Error saving user: ");
        console.log(error);
        response.sendStatus(501);
        next();
    });
  }
    })




    userRouter.post('/login',async(request,response)=>{
      
     try {
        const user = await User.findOne({ email: request.body.email });
        console.log(user);
        if (user) {
          const cmp = await bcrypt.compare(request.body.password, user.passwordHash);
          if (cmp) {
            //   ..... further code to maintain authentication like jwt or sessions
            response.send("Auth Successful");
          } else {
            response.send("Wrong username or password.");
          }
        } else {
            response.send("Wrong username or password.");
        }
      } catch (error) {
        console.log(error);
        response.status(500).send("Internal Server error Occured");
      }
    })
    
        

module.exports = userRouter;