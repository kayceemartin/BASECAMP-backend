const express = require('express')
const Campsite = require('../models/BASECAMP')

const router = express.Router()

//BASECAMP Show Route
router.get('/:id', async (req, res) =>{
    try {
        const {id} = req.params
        const oneCampsite = await Campsite.findById(id)
        res.json(oneCampsite)
    } catch(err) {
        res.send('error occcured')
    }
})


//BASECAMP Index Route
router.get('/', async (req, res) => {
    try {
        const allCampsites = await Campsite.find()
        res.json(allCampsites)
    } catch(err) {
        res.send('error occcured')
    }
})


//BASECAMP Create Route
router.post('/', async(req, res) => {
    try {
        const newCampsite = await Campsite.create(req.body)
        res.json(newCampsite)
    } catch(err) {
        res.send('error occured')
    }
})


//BASECAMP Delete Route
router.delete('/:id', async (req, res) => {
    try {
        const deleteCampsite = await Campsite.deleteOne({_id: req.params.id})
        res.json(deleteCampsite)
    } catch(err) {
        res.send('error occured')
    }
})


//BASECAMP Update Route
router.put('/:id', async(req, res) => {
    try {
        const updateCampsite = await Campsite.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.json(updateCampsite)
    } catch(err) {
        res.send('error occured')
    }
})


module.exports = router