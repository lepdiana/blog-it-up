const express = require('express')
const allBlogRouter = express.Router()
const AllBlogPost = require('../models/blogPost.js')


// set up a comment system with commentRouter.get("/:comment", (req,res,next) => Coment.find({comment: req.param.comment}))


const handleRequest = (err,req,res,next,arg) => err ? res.status(500).next(err) : res.status(200).send(arg)
const dataBaseChange = (err,req,res,next,arg) =>  err ? res.status(500).next(err) : res.status(201).send(arg)

allBlogRouter.get('/', (req,res,next) => {
  AllBlogPost.find( (err,blogPosts) => {
    handleRequest(err,req,res,next,blogPosts)
  })
})


module.exports = allBlogRouter