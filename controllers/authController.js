const bcrypt = require('bcryptjs')
const User = require('../models/users')
let count = 0
let loginCount = 0
module.exports = {
  login: (req, res) => {
    loginCount++
    if (loginCount > 2) {
      loginCount = 0
      req.session.loginMessage = ''
    }
    res.render('login.ejs', {
      session: req.session
    })
  },
  register: (req, res) => {
    count++
    if (count > 1) {
      count = 0
      req.session.emailMessage = ''
    }
    res.render('register.ejs', {
      session: req.session
    })
  },
  createLoginSession: async (req, res) => {
    try {
      const foundUser = await User.findOne({ email: req.body.email })
      if (foundUser) {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.logged = true
          req.session.usersDbId = foundUser._id
          res.redirect('/events')
        } else {
          req.session.loginMessage = 'This this not a valid email or password'
          res.redirect('/auth/login')
        }
      } else {
        req.session.loginMessage = 'This this not a valid email or password'
        res.redirect('/auth/login')
      }
    } catch (err) {
      req.session.loginMessage = 'Username or password is incorrect!'
      res.redirect('/auth/login')
    }
  },
  createRegisterSession: async (req, res) => {
    try {
      const createdUser = await User.create(req.body)
      if (createdUser) {
        req.session.logged = true
        req.session.usersDbId = createdUser._id
        res.redirect('/events')
      }
    } catch (err) {
      req.session.emailMessage = 'Email address has already been registered!'
      res.redirect('/auth/register')
    }
  },
  destroy: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        res.send(err)
      } else {
        res.redirect('/auth/login')
      }
    })
  }
}
