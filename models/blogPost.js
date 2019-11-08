const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
},
  title: {
    type: String,
    
  },
  author: {
    type: String,
  },
  date: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String
  }
})


module.exports = mongoose.model('Blog', blogPostSchema)