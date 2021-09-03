const blogsRouter = require('express').Router()
const { request, response } = require('express')
const person = require('../../part3/models/person')
const Blog = require('../models/blogs')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  })
  
  blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    })
    try {
      const savedBlog = await blog.save()
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
