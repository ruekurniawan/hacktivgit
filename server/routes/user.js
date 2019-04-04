const express = require('express')
const router = express.Router()
const userController = require('../controllers/git')

router.get('/', userController.getRepos)
router.post('/', userController.createRepos)
router.delete('/:owner/:reponame', userController.deleteRepos)
router.get('/:username/starred', userController.listStar)
router.put('/starred/:username/:reponame', userController.checkedStar)
router.delete('/starred/:username/:reponame', userController.unCheckedStar)
router.get('/:username/repos', userController.otherUser)
router.get('/following', userController.following)
router.get('/repos/:owner/:repos/readme', userController.getReadme)
module.exports=router