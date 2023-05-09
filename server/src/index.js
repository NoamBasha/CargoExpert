const { algo } = require("./algo_js/algo.js");
const { improve } = require("./algo_js/improve.js");

let PythonShellLibrary = require("python-shell");
let { PythonShell } = PythonShellLibrary;
const bodyParser = require("body-parser");
let mongoose = require("mongoose");

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const crypto = require("crypto");

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname + "/public")));

const CONNECTION_URL =
  "mongodb+srv://yonipini:cargoexpert@cluster0.jq9nixx.mongodb.net/?retryWrites=true&w=majority";

const { User, Project, Box, Solution } = require("./models/data_base.js");

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

function parse_response_from_algo(result) {
  result_string = result[0];
  result_string = result_string.replace(/ /g, "");
  result_string = result_string.replace(/'/g, '"');
  result_json = JSON.parse(result_string);
  return result_json;
}

app.post("/getSolutions", (req, res) => {
  console.log(req.body);
  options = {
    args: [JSON.stringify(req.body)],
    pythonOptions: ["-u"], // The '-u' tells Python to flush every time // get print results in real-time
  };
  PythonShell.run("algo.py", options, function (err, result) {
    if (err) {
      console.log(err.traceback);
    } else {
      result = parse_response_from_algo(result);
      res.send(result);
    }
  });
});

app.post("/getSolutionsJS", (req, res) => {
  const solutions = algo(req.body);
  res.send(solutions);
});

app.post("/improveSolution", (req, res) => {
  console.log(req.body);
  //res.sendFile(path.join(__dirname, 'uploadFile.html'));
  options = {
    args: [JSON.stringify(req.body)],
    pythonOptions: ["-u"], // The '-u' tells Python to flush every time // get print results in real-time
  };
  PythonShell.run("improve.py", options, function (err, result) {
    if (err) {
      console.log(err.traceback);
    } else {
      result = parse_response_from_algo(result);
      res.send(result);
    }
  });
});

app.post("/improveSolutionJS", (req, res) => {
  const solutions = improve(req.body);
  res.send(solutions);
});

app.get("/userInputExample", function (req, res) {
  let fileName = "./user_input_example.csv"; // The default name the browser will use
  res.download(fileName);
});

// create User

app.post("/createUser", async (req, res) => {
  sha = crypto.createHash("sha256");
  try {
    await User.create({
      email: req.body.email,
      password: sha.update(req.body.password).digest("hex"),
    });
    res.sendStatus(200);
  } catch (err) {
    if (err.message.includes("duplicate key error collection"))
      res.status(400).json({
        error: "The email you provided already exists. Please try again.",
      });
    else res.status(400).json({ error: err.message });
  }
});

// read User
app.post("/readUser", (req, res) => {
  sha = crypto.createHash("sha256");
  User.findOne(
    {
      email: req.body.email,
      password: sha.update(req.body.password).digest("hex"),
    },
    (err, data) => {
      if (err) res.status(400).json({ error: err.message });
      else {
        if (data) res.status(200).json(data.projects);
        else
          res.status(400).json({
            error: "Invalid login credentials. Please try again.",
          });
      }
    }
  );
});

// delete User
app.post("/deleteUser", (req, res) => {
  sha = crypto.createHash("sha256");
  User.deleteOne(
    {
      email: req.body.email,
      password: sha.update(req.body.password).digest("hex"),
    },
    (err, data) => {
      if (err) res.send(err);
      else res.send(data);
    }
  );
});

// update User
app.post("/updateUser", (req, res) => {
  // const bodySize = Buffer.byteLength(JSON.stringify(req.body));
  // console.log(`Request body size: ${bodySize} bytes`);
  sha = crypto.createHash("sha256");
  User.findOne(
    {
      email: req.body.email,
      password: sha.update(req.body.password).digest("hex"),
    },
    (err, data) => {
      if (err) res.send(err);
      else {
        if (data) {
          data.projects = req.body.newProjects;
          data.populate({
            path: "projects",
            populate: {
              path: "boxes",
              model: "Box",
              path: "solutions",
              populate: {
                path: "boxes",
                model: "Box",
              },
            },
          });
          data.save();
          console.log("updated projects successfully!!");
          res.sendStatus(200);
        } else res.status(400).json({ error: "Invalid user" });
      }
    }
  );
});

app.listen(1337, () => {
  console.log("listening on port 1337");
});
