const blogsRouter = require('express').Router()
const { request, response } = require('express')
const person = require('../../part3/models/person')
const Blog = require('../models/blogs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
  })
  
  blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    try {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog)
    } catch(exception) {
      next(exception)
    }
  
  })

  blogsRouter.delete('/:id', async (request, response, next) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  })

  blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }
    try {
      await Blog.findByIdAndUpdate(request.params.id, blog)
      .then(updatedBlog => {
        response.json(updatedBlog)
      })
    } catch (exception) {
      next(exception)
    }
  })
  module.exports = blogsRouter
