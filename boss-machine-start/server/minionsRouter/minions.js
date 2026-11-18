const express = require("express");
const { getAllFromDatabase, addToDatabase } = require("../db");

// create router
const minionsRouter = express.Router();

// set up routes

// get all minions
minionsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("minions"));
});

// add new minion to database
minionsRouter.post("/", (req, res, next) => {
  const newMinion = req.body;
  if (
    newMinion.name &&
    newMinion.title &&
    typeof newMinion.salary === "number"
  ) {
    const createdMinion = addToDatabase("minions", newMinion);
    res.status(201).send(createdMinion);
  } else {
    res.status(400).send();
  }
});

// get a single minion by id
minionsRouter.get("", (req, res, next) => {});

// update a single minion by id
minionsRouter.put("", (req, res, next) => {});

// delete a single minion by id
minionsRouter.delete("", (req, res, next) => {});

module.exports = minionsRouter;
