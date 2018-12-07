const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  try{
    const blogs = await Blog
      .find({})
      .populate('user', { id: 1, username: 1, name: 1, })
    response.json(blogs.map(Blog.format))
  } catch(exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

blogsRouter.post('/', async (request, response) => {
  try{
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if(body.title.length === 0||body.url.length === 0||body.author.length === 0){
      return response.status(400).json({ error: 'title, url & author required' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: {
        _id: user._id,
        username: user.username,
        name: user.name
      }
    })

    const saved = await blog.save()
    user.blogs = user.blogs.concat(saved._id)
    await user.save()
    // console.log(blog.populate('user', { id: 1, username: 1, name: 1, }))
    const populatedBlog = await Blog
      .findById(saved._id)
      .populate('user', { id: 1, username: 1, name: 1, })

    response.status(201).json(Blog.format(populatedBlog))
  } catch(exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.get('/:id', async (request, response) => {
  try{
    const id = request.params.id
    const singleBlog = await Blog.findById(id)
    if (singleBlog) response.status(200).json(Blog.format(singleBlog))
    else response.status(404).end()

  } catch (exception) {
    //console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (user.id.toString() === blog.user.toString() || blog.user === null) {
      await Blog.findByIdAndDelete(request.params.id)
    }
    else {
      response.status(401).json({ error: 'unauthorized user' })
    }


    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try{
    const id = request.params.id
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user
    }

    const updated = await Blog.findByIdAndUpdate(id, blog, { new: true })
      .populate('user', { id: 1, username: 1, name: 1, })

    response.status(200).json(Blog.format(updated))

  } catch(exception){
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = blogsRouter
