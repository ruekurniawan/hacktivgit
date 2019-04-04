const axios = require('axios')
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
}

module.exports = UserController