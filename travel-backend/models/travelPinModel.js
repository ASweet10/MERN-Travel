const mongoose = require("mongoose")

const Schema = mongoose.Schema

// Schema defines document structure
const travelPinSchema = new Schema ({
    title: { type: String, required: true },
    type: { type: String,
            enum: ['Restaurant', 'Attraction'],
            required: true},
    description: { type: String, required: true },
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    //Associate each workout with a specific user ID
    user_id: { type: String, required: true }

}, {timestamps: true})

// Model applies schema, then use model to interact with collection
// Export (Workout) module, then call functions [i.e. Workout.find()]
module.exports = mongoose.model("TravelPin", travelPinSchema)