const TravelPins = require("../models/travelPinModel")
const mongoose = require("mongoose")
const express = require("express")
const requireAuth = require('../middleware/requireAuth')

const router = express.Router() //Get access to express router

//Make sure user is authenticated before map can be accessed
router.use(requireAuth)

// GET all pins
router.get('/', async ( req, res ) => {
    const travelPins = await TravelPins.find()

    res.status(200).json(travelPins)
})

// GET single pin 
router.get('/:id', async ( req, res ) => {
    // Get ID property from route
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such ID"})
    }

    const travelPin = await TravelPins.findById(id)

    //If not found...
    if (!travelPin) {
        return res.status(404).json({error: "Pin not found"})
    }

    res.status(200).json(travelPin)
})

// POST a new pin
router.post('/', async ( req, res ) => {
    const {title, type, description} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!type){
        emptyFields.push('type')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    try{
        const user_id = req.user._id
        //Store Create response in travelPin
        // Create document with {} properties
        const travelPin = await TravelPins.create({title, type, description, user_id})
        
        //Send json object
        res.status(200).json(travelPin)
    } catch (error){
        res.status(400).json({error: error.message})
        console.log({error: error.message})
    }
})

// DELETE a pin
router.delete('/:id', async ( req, res ) => {
    // Get ID property from route
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such ID"})
    }

    const travelPin = await TravelPins.findOneAndDelete({_id: id})

    //If not found...
    if (!travelPin) {
        return res.status(404).json({error: "pin not found"})
    }

    res.status(200).json(travelPin)
})

// UPDATE a pin
router.patch('/:id', async ( req, res ) => {
    // Get ID property from route
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such ID"})
    }

    const travelPin = await TravelPins.findOneAndUpdate({_id: id}, {
        //Could also pass / update a single property,
        // i.e.: title: 'abc'
        ...req.body
    })    
})

module.exports = router