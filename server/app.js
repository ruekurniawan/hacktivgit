require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require('./routes/user')

const mongoose = require('mongoose')
let dbName = 'mongodb://localhost:27017/hacktivGit'


mongoose.connect(dbName, { useNewUrlParser: true })
mongoose.connection.once('open', function() {
  console.log(`Connected!`)
}).on('error', function(err) {
  console.log('Error connection : ', err)
})


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

app.use('/users', userRoutes)

const port = 3000
app.listen(port, () => {
  console.log(`listen on port ${port}`)
})