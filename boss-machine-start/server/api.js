const express = require("express");
const apiRouter = express.Router();
const minionsRouter = require("./minionsRouter/minions");
const ideasRouter = require("./ideasRouter/ideas");
const meetingsRouter = require("./meetingsRouter/meetings");

// mount routers to apiRouter for better code separation
apiRouter.use("/minions", minionsRouter);
apiRouter.use("/ideas", ideasRouter);
apiRouter.use("/meetings", meetingsRouter);

module.exports = apiRouter;
