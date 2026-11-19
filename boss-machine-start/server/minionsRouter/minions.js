const express = require("express");
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("../db");

// import work router for minions
const workRouter = require("../workRouter/work");

// create router
const minionsRouter = express.Router();

// mount work router to minions router
minionsRouter.use("/:minionId/work", workRouter);

// set up routes

// get all minions
minionsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("minions"));
});

// add new minion to database
minionsRouter.post("/", (req, res, next) => {
  const newMinion = req.body;
  const salary = Number(newMinion.salary);
  if (
    newMinion.hasOwnProperty("name") &&
    newMinion.hasOwnProperty("title") &&
    newMinion.hasOwnProperty("salary") &&
    !isNaN(salary)
  ) {
    newMinion.salary = salary;
    const createdMinion = addToDatabase("minions", newMinion);
    res.status(201).send(createdMinion);
  } else {
    res.status(400).send();
  }
});

// get a single minion by id
minionsRouter.get("/:minionId", (req, res, next) => {
  const minionId = req.params.minionId;
  const foundMinion = getFromDatabaseById("minions", minionId);
  if (foundMinion) {
    res.status(200).send(foundMinion);
  } else {
    res.status(404).send();
  }
});

// update a single minion by id
minionsRouter.put("/:minionId", (req, res, next) => {
  const minionUpdate = req.body;
  minionUpdate.id = req.params.minionId;
  const updatedMinion = updateInstanceInDatabase("minions", minionUpdate);
  if (updatedMinion) {
    res.status(200).send(updatedMinion);
  } else {
    res.status(404).send();
  }
});

// delete a single minion by id
minionsRouter.delete("/:minionId", (req, res, next) => {
  const minionId = req.params.minionId;
  const result = deleteFromDatabasebyId("minions", minionId);
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = minionsRouter;
