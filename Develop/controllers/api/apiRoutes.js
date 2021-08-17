const workout = ("../models/Workout.js");
const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const router = require("express").Router();
const index = require("../api/index");

//route to get all the workouts
router.get("api/workouts", (req, res) => {
    Workout.aggregate([{}])
});