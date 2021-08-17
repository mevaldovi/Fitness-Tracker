const express = require("express");
const path = require("path");
const router = require("express").Router();
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

router.put("/api/workouts/:id", ({ params, body }, res) => {
    //update based on id and push new exercise into workout
    console.log(params);
    Workout.findByIdandUpdate(params.id, { $push: { exercise: body } }, { new: true })
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
})

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/exercise.html"));
});

router.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/stats.html"));
});

module.exports = router;