const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body);
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('id is present', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r._id)
    expect(contents).toBeDefined()
  })
  
  test('blog can be added', async () => {
    const newBlog = {
      _id: "b54a6ert76234d17f7",
      title: "yo",
      author: "Miguli",
      url: "dddcomfddfff.comn/",
      likes: 1,
      __v: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      "yo"
    )
  })
  

  afterAll(() => {
    mongoose.connection.close()
  })