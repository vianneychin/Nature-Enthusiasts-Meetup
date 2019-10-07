const User = require('../models/users')

module.exports = {
  index: async (req, res) => {
    if ((req.session.usersDbId.name = 'admin'))
      try {
        const foundUser = await User.find({})

        res.render('users/index.ejs', {
          user: foundUser
        })
      } catch (err) {
        res.render(err)
      }
  },
  edit: async (req, res) => {
    try {
      const editUser = await User.findById(req.params.id)
      res.render('users/edit.ejs', {
        user: editUser,
        id: req.params.id
      })
    } catch (err) {
      res.send(err)
    }
  },
  update: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      if (!req.body.password) {
        delete req.body.password
      } else {
        req.body.password = user.hashPassword(req.body.password)
      }
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)
      res.redirect('/events')
    } catch (err) {
      res.send(err)
    }
  },
  show: async (req, res) => {
    try {
      const foundUser = await User.findById(req.params.id)
      res.render('users/show.ejs', {
        user: foundUser,
        sessionId: req.session.usersDbId
      })
    } catch (err) {
      res.send(err)
    }
  },
  destroy: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id)
      res.redirect('/')
    } catch (err) {
      res.send(err)
    }
  }
}
