const express = require("express");
const { default: minions } = require("../../browser/store/minions");

const minionsRouter = express.Router();

minionsRouter.get("/", (req, res, next) => {
  res.send(minions);
});
minionsRouter.post("", (req, res, next) => {});
minionsRouter.get("", (req, res, next) => {});
minionsRouter.put("", (req, res, next) => {});
minionsRouter.delete("", (req, res, next) => {});

module.exports = minionsRouter;
