const express = require("express");

// create router
const workRouter = express.Router();

// set up routes

// get all work for given minion
workRouter.get("", (req, res, next) => {});

// create new work object for givern minion
workRouter.post("", (req, res, next) => {});

// update a single work object by id
workRouter.put("", (req, res, next) => {});

// delete a single work object by id
workRouter.delete("", (req, res, next) => {});
