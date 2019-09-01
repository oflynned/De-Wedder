const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");
const morgan = require("morgan");
const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.options("*", cors());

app.use(express.static(path.join(__dirname, "ui/build")));
app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "/ui/build/index.html")));

module.exports = app;
