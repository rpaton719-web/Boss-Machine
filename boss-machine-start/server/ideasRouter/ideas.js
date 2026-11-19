const express = require("express");
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("../db");
const checkMillionDollarIdea = require("../checkMillionDollarIdea");

// create router
const ideasRouter = express.Router();

// set up routes

// get all ideas
ideasRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("ideas"));
});

// add new idea to database
ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  const newIdea = req.body;
  const numWeeks = Number(newIdea.numWeeks);
  const weeklyRevenue = Number(newIdea.weeklyRevenue);
  if (
    newIdea.hasOwnProperty("name") &&
    newIdea.hasOwnProperty("description") &&
    newIdea.hasOwnProperty("numWeeks") &&
    newIdea.hasOwnProperty("weeklyRevenue") &&
    !isNaN(numWeeks) &&
    !isNaN(weeklyRevenue)
  ) {
    newIdea.numWeeks = numWeeks;
    newIdea.weeklyRevenue = weeklyRevenue;
    const createdIdea = addToDatabase("ideas", newIdea);
    res.status(201).send(createdIdea);
  } else {
    res.status(400).send();
  }
});

// get single idea by id
ideasRouter.get("/:ideaId", (req, res, next) => {
  const ideaId = req.params.ideaId;
  const foundIdea = getFromDatabaseById("ideas", ideaId);
  if (foundIdea) {
    res.status(200).send(foundIdea);
  } else {
    res.status(404).send();
  }
});

// update single idea by id
ideasRouter.put("/:ideaId", (req, res, next) => {
  const ideaUpdate = req.body;
  ideaUpdate.id = req.params.ideaId;
  const updatedIdea = updateInstanceInDatabase("ideas", ideaUpdate);
  if (updatedIdea) {
    res.status(200).send(updatedIdea);
  } else {
    res.status(404).send();
  }
});

// delete single idea by id
ideasRouter.delete("/:ideaId", (req, res, next) => {
  const ideaId = req.params.ideaId;
  const result = deleteFromDatabasebyId("ideas", ideaId);
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = ideasRouter;
