const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const userSchema = new mongoose.Schema({
  username: String,
});

const User = mongoose.model("User", userSchema);

const exerciseSchema = new mongoose.Schema({
  id: String,
  username: String,
  description: String,
  duration: Number,
  date: String,
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

app.post("/api/users", function (req, res) {
  const newUser = new User({ username: req.body.username });
  newUser
    .save()
    .then(() => {
      console.log(`${newUser.username} Added!`);
      res.json({ username: newUser.username, _id: newUser._id });
    })
    .catch((err) => console.error(err));
});

app.get("/api/users", function (req, res) {
  User.find({})
    .then((result) => res.json(result))
    .catch((err) => console.error(err));
});

app.post("/api/users/:_id/exercises", function (req, res) {
  User.findById(req.params._id)
    .then((user) => {
      const newExercise = new Exercise({
        id: user._id,
        username: user.username,
        description: req.body.description,
        duration: Number(req.body.duration),
        date: req.body.date
          ? new Date(req.body.date).toDateString()
          : new Date().toDateString(),
      });

      newExercise
        .save()
        .then(() => console.log(`${newExercise.description} Added!`))
        .catch((err) => console.error(err));

      res.json({
        _id: newExercise.id,
        username: newExercise.username,
        date: newExercise.date,
        duration: newExercise.duration,
        description: newExercise.description,
      });
    })
    .catch((err) => console.error(err));
});

app.get("/api/users/:_id/logs", function (req, res) {
  User.findById(req.params._id)
    .then((user) => {
      Exercise.find({ id: req.params._id })
        .then((exercises) => {
          let logs = exercises.map((ex) => ({
            description: ex.description,
            duration: ex.duration,
            date: ex.date,
          }));
          const { from, to, limit } = req.query;

          if (from) {
            logs = logs.filter(
              (ex) =>
                new Date(ex.date).setHours(0, 0, 0, 0) >=
                new Date(from).setHours(0, 0, 0, 0)
            );
          }

          if (to) {
            logs = logs.filter(
              (ex) =>
                new Date(ex.date).setHours(0, 0, 0, 0) <=
                new Date(to).setHours(0, 0, 0, 0)
            );
          }

          if (limit) {
            logs = logs.slice(0, Number(limit));
          }
          res.json({
            username: user.username,
            count: logs.length,
            _id: user.id,
            log: logs,
          });
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
