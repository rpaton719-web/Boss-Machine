const express = require("express");
const {
  createMeeting,
  addToDatabase,
  deleteAllFromDatabase,
} = require("../db");

// create router
const meetingsRouter = express.Router();

// set up routes

// get all meetings
meetingsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("meetings"));
});

// add new meeting to database
meetingsRouter.post("/", (req, res, next) => {
  const newMeeting = createMeeting();
  const createdMeeting = addToDatabase("meetings", newMeeting);
  res.status(201).send(createdMeeting);
});

// delete ALL meetings from database
meetingsRouter.delete("/", (req, res, next) => {
  deleteAllFromDatabase("meetings");
  res.status(204).send();
});

module.exports = meetingsRouter;
