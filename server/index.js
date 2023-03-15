
let PythonShellLibrary = require("python-shell");
let { PythonShell } = PythonShellLibrary;
let {mongoose} = require("mongoose");
const bodyParser=require('body-parser');


const express = require("express");
const app = express();
const cors = require("cors");

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({extended: true}));

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

app.get('user_input_example', function (req, res,) {
    let filePath = "C:/Users/WIN10/source/repos/final project/code/CSV files/user_input_example.csv"; // Or format the path using the id rest param
    let fileName = "user_input_example.csv"; // The default name the browser will use

    res.download(filePath, fileName);    
});

app.listen(1337, () => {
	console.log("listening on port 1337");
});

const CONNECTION_URL = 'mongodb+srv://yonipini:Yonipini96@cluster0.jq9nixx.mongodb.net/?retryWrites=true&w=majority';
const PORT = 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log("connected  to database"))
	.catch((error) => console.log("error loggin to db\n" + error.message));

// mongoose.set('useFindAndModify', false);