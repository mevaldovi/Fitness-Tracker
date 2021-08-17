const express = require("express");
const path = require("path");
const router = require("express").Router();

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/exercise.html"))
});

app.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "./stats.html"))
});