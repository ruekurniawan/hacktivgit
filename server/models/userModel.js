var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  name : String,
  email: String,
  password : String
})

var UserModel = mongoose.model('Login', userSchema)

module.exports = UserModel