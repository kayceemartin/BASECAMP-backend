const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/commentsDB", {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;


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
    likes: {
        type: Number
    }, 
    editable: {
        type: Boolean
    },
    replies: [{
        name:{
            type: String
        },
        message: {
            type: String
        },
        likes: {
            type: Number
        }
    }]
})

const CommentModel = mongoose.model('Comments', commentsSchema);

const commentsToInsert =[
    {
        name: "campinggurl",
        comment: "I went camping here and absolutely loved it!",
        likes: 23,
        editable: false,
        replies: [
            {
                name:"vanlifer",
                comment:"Yes!! But dont forget ur bug spray!",
                likes: 12
            }
        ]

    }
]

CommentModel.insertMany(commentsToInsert, (err, data) => {
    if(err){
        console.log(err)
    }else {
        console.log("success!")
    }
})

