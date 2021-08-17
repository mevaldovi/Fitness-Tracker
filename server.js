const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const db = require("./Develop/models/Workout");
const routes = require("./Develop/controllers");
const viewRoutes = require("./Develop/controllers/view/viewRoutes.js");
const api = require("./Develop/controllers/api/apiRoutes");

const PORT = process.env.PORT || 3000;
const app = express();

//use the routes
//the 'api' below works but for some weird reason, 'viewRoutes' will not!
app.use(api);
app.use(viewRoutes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./Develop/public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// routes
// app.use(require("./Develop/controllers/api"));
// app.use(require("./Develop/controllers/view"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});