const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async ( req, res, next ) => {

    //Verify authentication
    const { authorization } = req.headers

    if ( !authorization ) {
        return res.status(401).json({error: "Authorization token required"})
    }

    //Split token, which looks like 'Bearer dadfaerejkl.asldkfjasdf.jiopupoij'
    //Becomes 2 elements of array, split around space
    //Use second element, the token string

    const token = authorization.split(' ')[1]

    try{
        //If successful, grab id from token
        const { _id} = jwt.verify( token, process.env.SECRET )

        //Try to find user in database
        //Returns document with just _id property
        req.user = await User.findOne({ _id }).select('_id')

        //Next goes to next function, i.e. workouts.js route functions
        next()

    } catch (error){
        console.log(error)
        res.status(401).json({error: "REQUEST IS NOT AUTHORIZED"})
    }
}

module.exports = requireAuth