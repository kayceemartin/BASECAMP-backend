const express = require('express')
const app = express()
const authController = require('./controllers/auth')
const basecampController = require('./controllers/basecamp')

const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

require('./db')


//APP CONFIGURATION
const PORT = 8000
const acceptList = ['http://localhost:3000']
const options = {
    origin: function(origin, callback) {
        if(acceptList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }else {
            callback(new Error ("Not allowed by CORS"))
        }
    }
}


//MIDDLEWARE
app.use(cors(options));
app.use(express.json());
app.use("/auth", authController);
app.use('/basecamp', basecampController)


//ROUTING
app.get('/', (req, res) => {
    res.status(200).json({
        body: "you have found the BASECAMP app"
    })
})

app.post('/get-data', (req, res) => {
    CommentModel.find({}, (err, data) => {
        if(err){
            console.log(err)
        }else {
            res.send(data);
        }
    }).limit(req.body.limitNum)
})



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})