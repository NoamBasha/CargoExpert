const {
	getSolutionsJS,
	improveSolutionJS,
	userInputExample,
	createUser,
	readUser,
	deleteUser,
	updateUser,
	serverListen,
} = require("./middlewares.js");

const { mongoose } = require("./db.js");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname + "/public")));

app.post("/getSolutionsJS", (req, res) => getSolutionsJS(req, res));

app.post("/improveSolutionJS", (req, res) => improveSolutionJS(req, res));

app.get("/userInputExample", (req, res) => userInputExample(req, res));

// create User
app.post("/createUser", (req, res) => createUser(req, res));
// read User
app.post("/readUser", (req, res) => readUser(req, res));
// delete User
app.post("/deleteUser", (req, res) => deleteUser(req, res));
// update User
app.post("/updateUser", (req, res) => updateUser(req, res));

app.listen(1337, () => serverListen());
