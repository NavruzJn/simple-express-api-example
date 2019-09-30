require("dotenv").config();

const debug = require("debug");
// Enable logs for whole app namespace. (use app:shared:*, app:web:* or app:bot:* namespaces)
debug.enable("app:*");

const start = require("./app");

start();

