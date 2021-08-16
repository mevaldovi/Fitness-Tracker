const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name: {},

    type: {},

    weight: {},

    sets: {},

    reps: {},

    duration: {},

    // if ("cardio") {
    //     distancetraveled: {}
    // }


});

const Workout = mongoose.model("Workout", workoutSchema)

module.exports = Workout;