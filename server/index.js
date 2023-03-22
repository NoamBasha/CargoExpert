let PythonShellLibrary = require("python-shell");
let { PythonShell } = PythonShellLibrary;
const bodyParser = require("body-parser");
let mongoose = require("mongoose");

const express = require("express");
const app = express();
const cors = require("cors");

const crypto = require("crypto");

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

const test_9 = {
	container: { width: 3, height: 1, length: 1 },
	boxes: [
		{
			order: 1,
			type: "Box1",
			width: 1,
			height: 1,
			length: 1,
			color: "gray",
			size: [1, 1, 1],
			position: [1, 1, 1],
		},

		{
			order: 2,
			type: "Box2",
			width: 1,
			height: 1,
			length: 1,
			color: "gray",
			size: [1, 1, 1],
			position: [1, 2, 1],
		},

		{
			order: 3,
			type: "Box3",
			width: 1,
			height: 1,
			length: 1,
			color: "gray",
			size: [1, 1, 1],
			position: [2, 1, 1],
		},
	],
};

function parse_response_from_algo(result) {
	result_string = result[0];
	result_string = result_string.replace(/ /g, "");
	result_string = result_string.replace(/'/g, '"');
	result_json = JSON.parse(result_string);
	return result_json;
}

app.post("/getSolutions", (req, res) => {
	console.log(req.body);
	//res.sendFile(path.join(__dirname, 'uploadFile.html'));
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

app.get("/noam1302", (req, res) => {
	//res.sendFile(path.join(__dirname, 'uploadFile.html'));
	options = {
		args: [JSON.stringify(test_9)],
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

app.get("/user_input_example", function (req, res) {
	let fileName = "./user_input_example.csv"; // The default name the browser will use
	res.download(fileName);
});

app.listen(1337, () => {
	console.log("listening on port 1337");
});

const CONNECTION_URL =
	"mongodb+srv://yonipini:cargoexpert@cluster0.jq9nixx.mongodb.net/?retryWrites=true&w=majority";

const { User, Project, Box, Solution } = require("./data_base");

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));


// register user
app.post("/register", async (req, res) => {
  sha = crypto.createHash('sha256');
  try{
    let newUser = await User.create({
      email: req.body.email,
      password: sha.update(req.body.password).digest('hex')
    })
    newUser.save();
    res.send(newUser);
  } catch (err) {
      res.send(err.message);
  }
});

// login user
app.post("/login", (req, res) => {
  sha = crypto.createHash('sha256');
	User.findOne({ email: req.body.email, password: sha.update(req.body.password).digest('hex') },
              (err, data) => {
		if (err) res.send(err);
		else {
      if (data)
        res.send(data.projects)
      else
        res.send('cannot find user data');
    };
	});
});

app.post("/deleteUser", (req, res) => {
  sha = crypto.createHash('sha256');
  User.deleteOne({ email: req.body.email, password: sha.update(req.body.password).digest('hex') }, (err, data) => {
		if (err) res.send(err);
		else res.send(data);
	});
});

// להכניס משתמש חדש - נותן פרטים עבור משתמש חדש
app.post("/createUser", (req, res) => {
	let userData = req.body;
	let user = new User(userData);

	user.populate({
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

	console.log(user);
	user.save((err, data) => {
		if (err) res.send(err);
		else res.sendStatus(200);
	});
});

// בהינתן מייל וסיסמה ופרוייקטים לעדכן את הפרוייקטים
app.post("/updateProjects", (req, res) => {
	// const bodySize = Buffer.byteLength(JSON.stringify(req.body));
	// console.log(`Request body size: ${bodySize} bytes`);
  sha = crypto.createHash('sha256');
	User.findOne({ email: req.body.email, password: sha.update(req.body.password).digest('hex') }, (err, data) => {
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
      }
      else
        res.send('cannot find user data');
		}
	});
});

// בהינתן מייל וסיסמה ומזהה של פרוייקט ופרוייקט לעדכן את הפרוייקט
app.post("/updateProject", (req, res) => {
	User.findOneAndUpdate(
		{ email: req.body.email, password: req.body.password },
		{ $pull: { projects: { id: req.body.projectID } } },
		(err, data) => {
			if (err) res.send(err);
			else {
				data.save((err, data) => {
					if (err) res.send(err);
					else res.send(data);
				});
			}
		}
	);

});

// בהינתן מייל וססיהמ ומזהה של פרוייקט  ומזהה של פתרון ופתרון רוצה לעדכן את הפתרון
app.post("/updateSolution", (req, res) => {
	User.findOne({ email: req.body.email, password: req.body.password }, (err, data) => {
		if (err) res.send(err);
		else {
			data.projects.update({ id: req.body.projectID }, { $set: req.body.newProject });
			data.save((err, data) => {
				if (err) res.send(err);
				else res.send(data);
			});
			console.log("updated project " + req.body.projectID + " successfully!!");
		}
	});
});
