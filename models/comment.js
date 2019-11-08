const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
      },
    comment: {
        type: String
      },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog"

    }
      
})
module.exports = mongoose.model('Comment', commentSchema)