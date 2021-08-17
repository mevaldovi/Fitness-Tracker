const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const workoutSchema = new Schema({
    day: {
        type: Date,
        default: new Date(new Date().setDate(new Date().getDate()))
    },

    exercises: [{
        name: {
            type: String,
            trim: true,
            required: true,
        },

        type: {
            type: String,
            trim: true,
            required: true,
        },

        weight: {
            type: Number,
        },

        sets: {
            type: Number,
        },

        reps: {
            type: Number,
        },

        duration: {
            type: Number,
            required: true,
        },

        distancetraveled: {
            type: Number
        },

    }]
});
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;