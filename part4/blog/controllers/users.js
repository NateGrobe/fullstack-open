const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, url: 1, author: 1 })
  res.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  const blog = await Blog.findById(body.blogId)

  if(body.password.length < 3)
    return res.status(400).json({
      error: 'password must be at least 3 characters'
    })

  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    blog: blog._id,
  })

  const savedUser = await user.save()
  res.json(savedUser)
})


module.exports = usersRouter
