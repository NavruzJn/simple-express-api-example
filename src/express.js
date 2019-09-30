const express = require("express");
const { Database } = require("./db/Database");
const { DateService } = require("./services/DateService");
const { UserService } = require("./services/UserService");
const bodyParser = require("body-parser");

function createServer() {
  const db = new Database();
  const app = express();
  const server = require("http").Server(app);

  const dateService = new DateService(db);
  const userService = new UserService(db);

  app.use(express.static("public"));
  app.use(bodyParser.json()); // to support JSON-encoded bodies
  app.use(
    bodyParser.urlencoded({
      // to support URL-encoded bodies
      extended: true
    })
  );

  app.get("/dates", async (req, res) => {
     const dates = await dateService.getAll();
     res.json(dates);
  });

  app.get("/users", async (req, res) => {
      const users = await userService.getAllUser();
      res.json(users);
  });

  return server;
}

module.exports = { createServer };
