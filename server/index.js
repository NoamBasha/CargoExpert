let PythonShellLibrary = require("python-shell");
let { PythonShell } = PythonShellLibrary;
const bodyParser = require("body-parser");
let mongoose = require("mongoose");

const express = require("express");
const app = express();
const cors = require("cors");

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

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

// TO DO: change this api name to "/getSolutions"
app.post("/noam1502", (req, res) => {
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
const { response } = require("express");

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// User.create({email: "yoinpin@@gmail.com", password: "1234", projects : []})


/*
*/

// למשוך את כל הנתונים  על  כל הפרוייקטים של המשתמש בהינתן מייל וסיסמה
app.post("/getUser", (req, res) => {
  let uEmail = req.body.email;
  let uPassword = req.body.password;
  User.findOne({ email: uEmail, password: uPassword }, (err, data) => {
    if (err) res.send(err);
    else res.send(data.projects);
  });
});

app.post("/deleteUser", (req, res) => {
  let uEmail = req.body.email;
  let uPassword = req.body.password;
  console.log(uEmail);
  User.deleteOne({ email: uEmail , password: uPassword }, (err, data) => {
    if (err) res.send(err);
    else res.send(data);
  });
});

// להכניס משתמש חדש - נותן פרטים עבור משתמש חדש
app.post("/createUser", (req, res) => {
  let userData = req.body;
  let user = new User(userData);

  user.populate({
    path :'projects',
    populate : {
      path :'boxes',
      model : 'Box',
      path : 'solutions',
      populate : {
        path :'boxes',
        model : 'Box',
      }
    }
  });

  console.log(user);
  user.save((err, data) => {
    if (err)
      res.send(err);
    else
      res.sendStatus(200);
  })
});

// בהינתן מייל וסיסמה ופרוייקטים לעדכן את הפרוייקטים
app.post("/updateProjects", (req, res) => {
  let uEmail = req.body.email;
  let uPassword = req.body.password;
  let updatedProjects = req.body.newProjects;
  
  User.findOne({ email: uEmail, password: uPassword }, (err, data) => {
    if (err) res.send(err);
    else {
      data.projects = updatedProjects;
      data.populate({
        path :'projects',
        populate : {
          path :'boxes',
          model : 'Box',
          path : 'solutions',
          populate : {
            path :'boxes',
            model : 'Box',
          }
        }
      });

      data.save((err, data) => {
        if (err) res.send(err);
        else res.sendStatus(200);
      });
      console.log("updated projects successfully!!");
    }
  });
});


// בהינתן מייל וסיסמה ומזהה של פרוייקט ופרוייקט לעדכן את הפרוייקט
app.post("/updateProject", (req, res) => {
	let uEmail = req.body.email;
	let uPassword = req.body.password;
	let uProjectID = req.body.projectID;
	let updatedProject = req.body.newProject;
	
  User.findOneAndUpdate({ "email": uEmail, "password": uPassword},
    { $pull : { projects: {id:uProjectID}}}, (err, data) => {
      if (err) res.send(err);
      else {
        data.save((err, data) => {
          if (err) res.send(err);
          else res.send(data);
        });
      }
    });

  // User.findOne({ email: uEmail, password: uPassword }, (err, data) => {
	//   if (err) res.send(err);
	//   else {
  //     console.log("\n\nbefore pull\n" + data.projects);
  //     data.projects.pull({id: uProjectID});
  //     console.log("\n\nafter pull\n" + data.projects);
  //     let p = new Project(updatedProject).populate({
  //       path :'boxes',
  //       model : 'Box',
  //       path : 'solutions',
  //       populate : {
  //         path :'boxes',
  //         model : 'Box'
  //       }
  //     });
  //     data.projects.push(p);
  //     console.log("updated project " + uProjectID +" successfully!!");
  //     res.send(data);
  //     // data.projects.findOne({id: uProjectID}, (err, data) => {
  //     //   if (err) res.send(err);
  //     //   else {
  //     //     data = updatedProject;
  //     //     data.populate({
  //     //       path :'boxes',
  //     //       model : 'Box',
  //     //       path : 'solutions',
  //     //       populate : {
  //     //         path :'boxes',
  //     //         model : 'Box'
  //     //       }
  //     //     });
  //     //     data.save((err, data) => {
  //     //       if (err) res.send(err);
  //     //       else res.send(data);
  //     //     });
  //     //   }
  //     // });
	//   }
	// });
});
  

// בהינתן מייל וססיהמ ומזהה של פרוייקט  ומזהה של פתרון ופתרון רוצה לעדכן את הפתרון
app.post("/updateSolution", (req, res) => {
	let uEmail = req.body.email;
	let uPassword = req.body.password;
	let uProjectID = req.body.projectID;
	let updatedProject = req.body.newProject;
	User.findOne({ email: uEmail, password: uPassword }, (err, data) => {
	  if (err) res.send(err);
	  else {
		data.projects.update({id: uProjectID}, {"$set": updatedProject})
		data.save((err, data) => {
		  if (err) res.send(err);
		  else res.send(data);
		});
		console.log("updated project " + uProjectID +" successfully!!");
	  }
	});
});
  
// create a new user
// const user = new User({
// 	email: 'johndoe@example.com',
// 	password: 'password',
// 	projects: []
// });

// user.save()
// 	.then(() => console.log('User created'))
// 	.catch(err => console.log(err));

// create a new project for the user
// const project = new Project({
// 	id: 1,
// 	container: [100, 100],
// 	boxes: [
// 	{ order: 1, position: [10, 10], text: 'Box 1', color: 'red', size: [50, 50] },
// 	{ order: 2, position: [30, 30], text: 'Box 2', color: 'blue', size: [40, 40] }
// 	],
// 	solutions: []
// });

// user.projects.push(project);

// user.save()
// 	.then(() => console.log('Project added to user'))
// 	.catch(err => console.log(err));

// // update a box in the project
// const updatedBox = {
// 	order: 1,
// 	position: [20, 20],
// 	text: 'Updated box 1',
// 	color: 'green',
// 	size: [60, 60]
// };

// Project.findOneAndUpdate({ id: 1, 'boxes.order': 1 }, { $set: { 'boxes.$': updatedBox } })
// 	.then(() => console.log('Box updated'))
// 	.catch(err => console.log(err));

// // delete a solution from the project
// Project.updateOne({ id: 1 }, { $pull: { solutions: { id: 'solution1' } } })
// 	.then(() => console.log('Solution deleted'))
// 	.catch(err => console.log(err));

// // find all projects with a box of a certain color
// Project.find({ 'boxes.color': 'red' })
// 	.then(projects => console.log('Projects with red boxes:', projects))
// 	.catch(err => console.log(err));

// // delete a user and all their projects, boxes, and solutions
// User.deleteOne({ email: 'johndoe@example.com' })
// 	.then(() => console.log('User deleted'))
// 	.catch(err => console.log(err));

// var UserModel = mongoose.model('user', UserSchema, 'Users');
// var UserModel = require('./data_base');

// var newUser = new UserModel({
// 	UserID: 2,
// 	Name: "noam",
// 	Email: "",
// 	Password: "2"
// })
// newUser.save(function(err, data) {
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log("Data inserted");
// 	});

// UserModel.findOne({UserID:1}, (err, data) => {
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(data);
// });

// mongoose.set('useFindAndModify', false);
