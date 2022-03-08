const express = require('express')
const app = express()
const basecampController = require('./controllers/basecamp')

require('./db')


//APP CONFIGURATION
const PORT = 8000

//MIDDLEWARE
app.use(express.json())

app.use('/basecamp', basecampController)


//ROUTING
app.get('/', (req, res) => {
    res.status(200).json({
        body: "you have found the BASECAMP app"
    })
})



app.listen(PORT, () => {
    console.log('🎉🎊', `listening on port ${PORT}`, '🎉🎊',)
})