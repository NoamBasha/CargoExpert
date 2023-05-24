const { algo } = require("./algo_js/algo.js");
const { improve } = require("./algo_js/improve.js");
const path = require("path");
let PythonShellLibrary = require("python-shell");
let { PythonShell } = PythonShellLibrary;
const crypto = require("crypto");
const { User } = require("./models/data_base.js");

function parse_response_from_algo(result) {
  result_string = result[0];
  result_string = result_string.replace(/ /g, "");
  result_string = result_string.replace(/'/g, '"');
  result_json = JSON.parse(result_string);
  return result_json;
}

const getSolutions = (req, res) => {
  const scriptPath = path.join(__dirname, "/algo_py/algo.py");
  console.log("Algo with Python");
  console.log(req.body);
  options = {
    args: [JSON.stringify(req.body)],
    pythonOptions: ["-u"], // The '-u' tells Python to flush every time // get print results in real-time
  };
  PythonShell.run(scriptPath, options, function (err, result) {
    if (err) {
      console.log(err.traceback);
    } else {
      //TODO: remove!
      console.log(result);
      result = parse_response_from_algo(result);
      res.send(result);
    }
  });
};

const getSolutionsJS = (req, res) => {
  console.log("Algo with JS");
  try {
    const solutions = algo(req.body);
    res.send(solutions);
  } catch (err) {
    res.status(400).json({ error: "Could not get solutions" });
  }
};

const getSolutions2 = (req, res) => {
  const scriptPath = path.join(__dirname, "/algo2_py/algo.py");
  console.log("Algo2 with Python");
  console.log(req.body);
  options = {
    args: [JSON.stringify(req.body)],
    pythonOptions: ["-u"], // The '-u' tells Python to flush every time // get print results in real-time
  };
  PythonShell.run(scriptPath, options, function (err, result) {
    if (err) {
      console.log(err.traceback);
    } else {
      result = parse_response_from_algo(result);
      res.send(result);
    }
  });
};

const improveSolution = (req, res) => {
  console.log(req.body);
  console.log("Improving with Python");
  //res.sendFile(path.join(__dirname, 'uploadFile.html'));
  options = {
    args: [JSON.stringify(req.body)],
    pythonOptions: ["-u"], // The '-u' tells Python to flush every time // get print results in real-time
  };
  PythonShell.run("src\\algo_py\\improve.py", options, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      result = parse_response_from_algo(result);
      res.send(result);
    }
  });
};

// TODO handle errors
const improveSolutionJS = (req, res) => {
  console.log("Improving with JS");
  try {
    const solutions = improve(req.body);
    res.send(solutions);
  } catch (err) {
    res.status(400).json({ error: "Could not improve" });
  }
};

const userInputExample = (req, res) => {
  console.log("Downloading Example File");
  try {
    res.download("./user_input_example.csv");
  } catch (err) {
    res.status(400).json({
      error: "Can't download file at this time. Please try again later.",
    });
  }
};

const createUser = async (req, res) => {
  sha = crypto.createHash("sha256");
  try {
    await User.create({
      email: req.body.email.trim(),
      password: sha.update(req.body.password.trim()).digest("hex"),
    });
    console.log("Good job!");

    res.sendStatus(200);
  } catch (err) {
    if (err.message.includes("duplicate key error")) {
      res.status(400).json({
        error: "Email already exists",
      });
    }
    if (err.errors.email) {
      const emailError = err.errors.email.properties.message;
      if (emailError) {
        res.status(400).json({
          error: emailError,
        });
      }
    }
    if (err.errors.password) {
      console.log(err.errors);
      const passwordError = err.errors.password.properties.message;
      console.log(passwordError);
      if (passwordError) {
        res.status(400).json({
          error: passwordError,
        });
      }
    }

    // if (emailError.includes("User validation failed")) {
    // 	res.status(400).json({
    // 		error: "The email you provided already exists. Please try again.",
    // 	});
    // }

    // if (emailError.includes("duplicate key error collection"))
    // 	res.status(400).json({
    // 		error: "The email you provided already exists. Please try again.",
    // 	});
    // else res.status(400).json({ error: emailError });
  }
};

const readUser = async (req, res) => {
  sha = crypto.createHash("sha256");
  User.findOne(
    {
      email: req.body.email,
      password: sha.update(req.body.password).digest("hex"),
    },
    (err, data) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        if (data) {
          res.status(200).json(data.projects);
        } else {
          res.status(400).json({
            error: "Invalid login credentials.",
          });
        }
      }
    }
  );
};

const deleteUser = (req, res) => {
  sha = crypto.createHash("sha256");
  User.deleteOne(
    {
      email: req.body.email,
      password: sha.update(req.body.password).digest("hex"),
    },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
};

const updateUser = (req, res) => {
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
        } else {
          res.status(400).json({ error: "Invalid user" });
        }
      }
    }
  );
};

const serverListen = (port) => {
  console.log(`listening on port ${port}`);
};

module.exports = {
  getSolutions,
  getSolutionsJS,
  improveSolutionJS,
  improveSolution,
  userInputExample,
  createUser,
  readUser,
  deleteUser,
  updateUser,
  serverListen,
};
