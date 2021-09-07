const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2
  },
  author: String,
  url: {
    type: String,
    required: true,
    minlength: 7
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Blog = mongoose.model('Blog', blogSchema)


module.exports = mongoose.model('Blog', blogSchema)