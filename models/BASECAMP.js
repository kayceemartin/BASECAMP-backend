const mongoose = require('mongoose')
const {Schema} = mongoose
const basecampSchema = mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    category: {type: String},
    payForSite: {type: Boolean, default: false},
    description: {type: String},
    likes: {type: Number, defualt: 0},
}, {timestamps: true})

const Campsite = mongoose.model("Campsite", basecampSchema)

module.exports = Campsite