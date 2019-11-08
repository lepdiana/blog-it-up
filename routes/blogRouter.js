const express = require('express')
const blogRouter = express.Router()
const BlogPost = require('../models/blogPost.js')


// set up a comment system with commentRouter.get("/:comment", (req,res,next) => Coment.find({comment: req.param.comment}))


const handleRequest = (err,req,res,next,arg) => err ? res.status(500).next(err) : res.status(200).send(arg)
const dataBaseChange = (err,req,res,next,arg) =>  err ? res.status(500).next(err) : res.status(201).send(arg)

blogRouter.get('/', (req,res,next) => {
  BlogPost.find({user: req.user._id, }, (err,blogPosts) => {
    handleRequest(err,req,res,next,blogPosts)
  })
})

blogRouter.post('/', (req,res,next) => {
  
  const newBlogPost = new BlogPost(req.body)
  
  newBlogPost.user = req.user._id
  newBlogPost.save( (err, blogPost) => {
    dataBaseChange(err,req,res,next,blogPost)
    
  })
})

// to find any blogPost including ones you didnt make
blogRouter.get('/:_id', (req,res,next) => {
  BlogPost.findById({_id: req.params._id, user: req.user._id}, (err, blogPost) => {
    handleRequest(err,req,res,next,blogPost)
  })
})

blogRouter.put('/:_id', (req,res,next) => {
  BlogPost.findOneAndUpdate({_id: req.params._id, user: req.user._id},
    req.body, {new: true}, (err,blogPost) => {
      dataBaseChange(err,res,res,next,blogPost)
    })
})

blogRouter.delete('/:_id', (req,res,next) => {
  BlogPost.findOneAndDelete({_id: req.params._id, user: req.user._id}, 
    (err, blogPost) => {
      dataBaseChange(err,req,res,next,blogPost)
    })
})


module.exports = blogRouter