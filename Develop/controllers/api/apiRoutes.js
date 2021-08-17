const workout = ("../models/Workout.js");
const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const router = require("express").Router();
const index = require("../api/index");
const Workout = require("../../models/Workout");

//route to get all the workouts out from the db
router.get("api/workouts", (req, res) => {
    Workout.aggregate([{
            $addFields: {
                totalDuration: {
                    $sum: "workout.duration",
                },
            },
        }])
        .then((fitnesstrackerdb) => {
            return res.json(fitnesstrackerdb);
        })
        .catch((err) => {
            res.json(err);
        });
});

//create a workout in the db

router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then((fitnesstrackerdb) => {
            res.json(fitnesstrackerdb)
        })
        .catch((err) => {
            res.json(err);
        });
});

//add exercise to workout

router.put("/api/workouts/:id", ({ params, body }, res => {
    //update based on id and push new exercise into workout
    Workout.findOneandUpdate({ _id: params.id }, { $push: { exercise: body } }, { new: true })
        .then((fitnesstrackerdb) => {
            res.json(fitnesstrackerdb)
        })
        .catch((err) => {
            res.json(err);
        });

    //workouts in the last seven dats
    router.get("api/workouts/stats", (req, res) => {
        Workout.aggregate([{
                $addFields: {
                    totalDuration: {
                        $sum: "$exercise.duration",
                    },
                },
            }, ])
            .sort({ _id: -1 })
            .limit(7)
            .then((fitnesstrackerdb) => {
                console.log(fitnesstrackerdb);
                res.json(fitnesstrackerdb);
            })
            .catch((err) => {
                res.json(err);
            });
    });
}))

module.exports = router;