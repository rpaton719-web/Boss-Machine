const express = require("express");

// create router
const meetingsRouter = express.Router();

// set up routes
meetingsRouter.get("", (req, res, next) => {});
meetingsRouter.post("", (req, res, next) => {});
meetingsRouter.delete("", (req, res, next) => {});

module.exports = meetingsRouter;
