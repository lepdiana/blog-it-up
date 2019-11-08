const express = require('express')
const app = express()
require("dotenv").config();
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const PORT = process.env.PORT || 4444

const path = require("path")


app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "build")))


//text if this works 

app.use('/api', expressJwt({secret: process.env.SECRET}))



mongoose.connect(process.env.MONGODB_URI|| 'mongodb://username:password1010@ds141228.mlab.com:41228/heroku_tmnjj8q8', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
}, console.log('db connected...'))

//Routes 

app.use('/api/blog', require('./routes/blogRouter.js'))
app.use('/api/comment', require('./routes/commentRouter.js'))
// for all blog posts weather you made them or not

app.use('/blog', require('./routes/allBlogsRouter.js'))
app.use('/user', require('./routes/signUpRouter.js'))
app.use('/auth', require('./routes/userRouter.js'))

app.use( (err,req,res,next) => {
  console.log(err)
  err.name ? res.status(err.status) : null
  res.send({errMsg: err.message})
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`live! on ${PORT}`)
})