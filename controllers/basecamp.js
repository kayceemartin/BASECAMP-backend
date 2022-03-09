const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router

const Campsite = require('../models/BASECAMP')
const { handleValidateOwnership, requireToken } = require('../middleware/auth')


//BASECAMP Show Route
router.get('/:id', async (req, res) =>{
    try {
        const {id} = req.params
        const oneCampsite = await Campsite.findById(id)
        .populate("creator")
        .exec();
        res.json(oneCampsite)
    } catch(err) {
        res.send('error occcured')
    }
})


//BASECAMP Index Route
router.get('/', async (req, res) => {
    try {
        const foundCampsites = await Campsite.find().populate('creator','username-_id').exec()
        res.json(foundCampsites)
    } catch(err) {
        res.send('error occcured')
    }
})


//BASECAMP Create Route
router.post('/', requireToken, (req, res, next) => {
    try {
        const newCampsite = await Campsite.create(req.body)
        res.status(200).json(newCampsite);
    } catch(err) {
        res.status(404).json({
            error : err.emssage,
        });
    }
});


//BASECAMP Delete Route
router.delete("/:id", handleValidateId, requireToken, (req, res, next) => {
    try {
      handleValidateOwnership(req, await Campsite.findById(req.params.id));
      const deletedCampsite = await Campsite.findByIdAndRemove(req.params.id);
      res.status(202).json(deletedCampsite);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });


//BASECAMP Update Route
router.put("/:id", requireToken, (req, res, next) => {
    try {
      handleValidateOwnership(req, await Campsite.findById(req.params.id));
      const updatedCampsite = await Campsite.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(204).json(updatedCampsite);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });


module.exports = router