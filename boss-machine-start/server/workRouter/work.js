const express = require("express");
const {
  getAllFromDatabase,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  getFromDatabaseById,
} = require("../db");

// create router
const workRouter = express.Router({ mergeParams: true });

// set up routes

// get all work for given minion
workRouter.get("/", (req, res, next) => {
  const minionId = req.params.minionId;
  const minionExists = getFromDatabaseById("minions", minionId);
  if (minionExists) {
    const allWork = getAllFromDatabase("work");
    const filteredWork = allWork.filter((work) => work.minionId === minionId);
    res.send(filteredWork);
  } else {
    res.status(404).send();
  }
});

// create new work object for given minion
workRouter.post("/", (req, res, next) => {
  const newWork = req.body;
  const hours = Number(newWork.hours);
  newWork.minionId = req.params.minionId;
  if (
    newWork.hasOwnProperty("title") &&
    newWork.hasOwnProperty("description") &&
    newWork.hasOwnProperty("hours") &&
    newWork.hasOwnProperty("minionId") &&
    !isNaN(hours)
  ) {
    newWork.hours = hours;
    const createdWork = addToDatabase("work", newWork);
    res.status(201).send(createdWork);
  } else {
    res.status(400).send();
  }
});

// update a single work object by id
workRouter.put("/:workId", (req, res, next) => {
  const workId = req.params.workId;
  const workExists = getFromDatabaseById("work", workId);
  const workUpdate = req.body;

  if (workExists) {
    if (workUpdate.minionId === req.params.minionId) {
      workUpdate.id = workId;
      const updatedWork = updateInstanceInDatabase("work", workUpdate);
      res.status(200).send(updatedWork);
    } else {
      res.status(400).send();
    }
  } else {
    res.status(404).send();
  }
});

// delete a single work object by id
workRouter.delete("/:workId", (req, res, next) => {
  const workId = req.params.workId;
  const workToDelete = getFromDatabaseById("work", workId);
  if (workToDelete && workToDelete.minionId === req.params.minionId) {
    deleteFromDatabasebyId("work", workId);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = workRouter;
