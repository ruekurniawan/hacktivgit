const axios = require('axios')
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken')
const client = new OAuth2Client(process.env.CLIENT_ID);
const User = require('../models/userModel')

let ax = axios.create({
  baseURL: 'https://api.github.com'
})
ax.defaults.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`

class UserController {
  static getRepos(req, res) {
    ax
      .get('/user/repos')
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static createRepos(req, res) {
    ax
      .post('/user/repos', {
        name: req.body.reponame
      })
      .then(({ data }) => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteRepos(req, res) {
    ax
      .delete(`/repos/${req.params.owner}/${req.params.reponame}`, {
        name: req.body.reponame
      })
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static listStar(req, res) {
    ax
      .get(`/users/${req.params.username}/starred`)
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static checkedStar(req, res) {
    ax
      .put(`/user/starred/${req.params.username}/${req.params.reponame}`)
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static unCheckedStar(req, res) {
    ax
      .delete(`/user/starred/${req.params.username}/${req.params.reponame}`)
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static otherUser(req, res) {
    ax
      .get(`/users/${req.params.username}/repos`)
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static following(req, res) {
    ax
      .get('/user/following')
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static getReadme(req, res) {
    ax
      .get(`/repos/${req.params.owner}/${req.params.repos}/readme`)
      .then(({ allReadme }) => {
        res.status(200).json(allReadme)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static gLogin(req, res) {
    // console.log(req.body)
    let payload = null
    client.verifyIdToken({
      idToken: req.body.idToken,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        payload = ticket.getPayload()
        // console.log(payload)
        const user = payload
        return User.findOne({
          email: payload.email
        })
          .then(user => {
            if (!user) {
              return User.create({
                email: payload.email,
                name: payload.name,
                password: '12345'
              })
            } else {
              const token = jwt.sign({
                email: user.email,
                name: user.name
              }, 'Rahasiakan')
              res.status(200).json({ token })
            }
          })
      })
      .then(newUser => {
        const token = jwt.sign({
          email: newUser.email,
          name: newUser.name
        }, 'Rahasiakan')
        res.status(200).json({ token })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = UserController