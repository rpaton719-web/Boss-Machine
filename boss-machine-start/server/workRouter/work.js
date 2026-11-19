const express = require("express");
const {
  getAllFromDatabase,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  getFromDatabaseById,
} = require("../db");

// create router
const workRouter = express.Router();

// set up routes

// get all work for given minion
workRouter.get("/", (req, res, next) => {
  const minionId = req.params.minionId;
  const allWork = getAllFromDatabase("work");
  const filteredWork = allWork.filter((work) => work.minionId === minionId);
  res.send(filteredWork);
});

// create new work object for givern minion
workRouter.post("/", (req, res, next) => {
  const newWork = req.body;
  newWork.minionId = req.params.minionId;
  if (
    newWork.title &&
    newWork.description &&
    typeof newWork.hours === "number" &&
    newWork.minionId
  ) {
    const createdWork = addToDatabase("work", newWork);
    res.status(201).send(createdWork);
  } else {
    res.status(400).send();
  }
});

// update a single work object by id
workRouter.put("/:workId", (req, res, next) => {
  const workUpdate = req.body;
  if (workUpdate.minionId === req.params.minionId) {
    const updatedWork = updateInstanceInDatabase("work", workUpdate);
    if (updatedWork) {
      res.status(200).send(updatedWork);
    } else {
      res.status(404).send();
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
