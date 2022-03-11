const mongoose = require('mongoose')
const commentsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        defualt: "Annonymous"
    }, 
    comment :{
        type: String,
        required: true,
    }, 
    beenHereBefore: {
        type: Boolean
    }, 
})

const Comment = mongoose.model('Comments', commentsSchema)

module.exports = Comment;