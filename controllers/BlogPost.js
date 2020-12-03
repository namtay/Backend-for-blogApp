const blogPostRouter = require('express').Router();
const BlogPost = require('../models/BlogPost');


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
blogPostRouter.get('/:title',(request,response,next)=>{
    const title = request.params.title;
     BlogPost.find({title:title}).then(res=>{
         response.status(200).send(res)
         next();
     })
 })

 //route for updating a post
 blogPostRouter.put('/:id',async(request,response,next)=>{
    const id = request.params.id;
    const content=request.body.content;
    const newBlogPost= BlogPost.find({_id:id});
    then(
           newBlogPost.update(content);
        res=>{
         response.status(200).send(res)
         next();
     })
 })

module.exports = blogPostRouter;

//use patch for update instead of put