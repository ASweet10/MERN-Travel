const express = require("express")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const router = express.Router()

//_id property from MongoDB is part of payload for JSON web token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' }) //Length user signed in for
    }

// Login route
// POST because we're sending data to server
router.post('/login', async ( req, res ) => {
    const { email, password } = req.body

    try{
        const user = await User.login(email, password)
        
        //Create a token ( 3 randomized strings, Header.Payload.Signature )
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch(error) {
        res.status(400).json({ error: error.message})
    }
})

// Signup route 
router.post('/signup', async ( req, res ) => {
    const { email, password } = req.body

    try{
        const user = await User.signup(email, password)
        
        //Create a token ( 3 randomized strings, Header.Payload.Signature )
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch(error) {
        res.status(400).json({ error: error.message})
    }
})

module.exports = router