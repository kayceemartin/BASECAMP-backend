const mongoose = require('mongoose')

const MONGO_URI = 'mongodb://127.0.0.1:27017/basecampDB'

mongoose.connect(MONGO_URI, () => {
    console.log('connected to MongoDB - BasecampDB')
})

mongoose.connection.on('error', err => {
    console.log(err.message, 'is MongoDB running?')
})

