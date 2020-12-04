const blogPostRouter = require('express').Router();
const { isValidObjectId } = require('mongoose');
const mongoose= require ('mongoose');
const BlogPost = require('../models/BlogPost');
const ObjectID = require('mongodb').ObjectID;


//route for getting all posts
blogPostRouter.get('/',(request,response,next)=>{

    BlogPost.find({}).then(res=>{
        response.status(200).send(res)
        next();
    })
})


//route for creating a post
blogPostRouter.post('/',async(request,response)=>{
    const{author,title,content}= request.body;   
    console.log(request.body.title);
    if (author && title && content){
        const blogPostCount = await BlogPost.countDocuments();     
         const newBlogPost =  new BlogPost({
            author:author,
            title:title,
            content:content,
            date:Date(),
            upvotes:0,
            downvotes:0
        })

        newBlogPost.save()
        .then(res=>{
            response.status(201).send({res, newBlogPost})
        })
        .catch(err=>{
            console.log(err)
            response.sendStatus(501);
        })
    }

    else{

        response.status(400).send({
            message:"Check your request body"
        })
    }
})


//route for getting all posts by a specific author
blogPostRouter.get('/:author',(request,response,next)=>{
   const author= request.params.author;
    BlogPost.find({author:author}).then(res=>{
        response.status(200).send(res)
        next();
    })
})


//route for getting all posts by a common title,not working
blogPostRouter.get('/:title',(req,res)=>{
    const title = req.params.title;
    
     //const result = await BlogPost.find({title:"my first book"});
        //  .then(res=>{
        //  res.status(200).send(res)})

        //  .catch(err=>{
        //      throw new Error (err)
        //  } )
       // res.status()
      res.json("ghgyhjg")
     // console.log(result);
       
     
 })
   
 //route for updating a post content and number of votes
 blogPostRouter.patch('/:id',async(req,res)=>{
     try{

        let _id = new ObjectID(req.params.id)         
		const post=await BlogPost.findOne({ _id: _id}).exec();
               
		if (req.body.content&& req.body.upvotes && req.body.downvotes ) {
            post.content = req.body.content
            post.upvotes = req.body.upvotes
            post.downvotes = req.body.downvotes
		}
       	post.save()
		res.send(post)
        }
      catch{
        res.status(404)
		res.send({ error: "Post doesn't exist!" })
      }
 })

//method2
 blogPostRouter.patch('/update/:id',async(req,res)=>{
    try{

       const _id = new ObjectID(req.params.id)         
       await BlogPost.update({ _id: _id},{$set:{
         content:req.body.content,
         upvotes: req.body.upvotes,
         downvotes:req.body.downvotes
       }})
       BlogPost.save()
       res.send(BlogPost)
       }
     catch{
       res.status(404)
       res.send({ error: "Post doesn't exist!" })
     }
})


 //route for deleting a post
 blogPostRouter.delete('/:id',async(req,res)=>{
    try {
        let _id = new ObjectID(req.params.id) 
		await BlogPost.deleteOne({ _id: req.params._id })
		res.status(204).send("Succesffuly deleted")
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
 })


module.exports = blogPostRouter;

