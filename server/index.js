// Now we need to create the express server.

let PythonShellLibrary = require("python-shell");
let { PythonShell } = PythonShellLibrary;

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

"id,type, taxabilty, weight, priority, width, height, length,isFlipable, isFragile"
const boxes = [
	{
		id: 0,
		type: "Box0",
		taxability: 50,
		weight: 20,
		priority: 10,
		size: [2, 2, 5],
		isFlipable: true,
		isFragile: false,
		color: "#00BCFF",
	},
	{
		id: 1,
		type: "Box1",
		taxability: 50,
		weight: 20,
		priority: 10,
		size: [2, 2, 5],
		isFlipable: true,
		isFragile: false,
		color: "#00BCFF",
	},
	{
		id: 2,
		type: "Box2",
		taxability: 50,
		weight: 20,
		priority: 10,
		size: [2, 2, 5],
		isFlipable: true,
		isFragile: false,
		color: "#00BCFF",
	},
	{
		id: 3,
		type: "Box3",
		taxability: 50,
		weight: 20,
		priority: 10,
		size: [2, 2, 5],
		isFlipable: true,
		isFragile: false,
		color: "#00BCFF",
	},
	{
		id: 4,
		type: "Box4",
		taxability: 50,
		weight: 20,
		priority: 10,
		size: [2, 2, 5],
		isFlipable: true,
		isFragile: false,
		color: "#00BCFF",
	},
	{
		id: 5,
		type: "Box5",
		taxability: 50,
		weight: 20,
		priority: 10,
		size: [2, 2, 5],
		isFlipable: true,
		isFragile: false,
		color: "#00BCFF",
	},
	{
		id: 6,
		type: "Box6",
		taxability: 50,
		weight: 20,
		priority: 10,
		size: [1, 1, 2.5],
		isFlipable: true,
		isFragile: false,
		color: "#00ffbc",
	},
	{
		id: 7,
		type: "Box7",
		taxability: 50,
		weight: 20,
		priority: 10,
		size: [1, 1, 2.5],
		isFlipable: true,
		isFragile: false,
		color: "#00ffbc",
	},
	{
		id: 8,
		type: "Box8",
		taxability: 50,
		weight: 20,
		priority: 10,
		size: [1, 1, 2.5],
		isFlipable: true,
		isFragile: false,
		color: "#00ffbc",
	},
	{
		id: 9,
		type: "Box9",
		taxability: 50,
		weight: 20,
		priority: 10,
		size: [1, 1, 2.5],
		isFlipable: true,
		isFragile: false,
		color: "#00ffbc",
	},
];

const container = {
	size: [3, 4, 10],
	maxWeight: 300
}

const project = {
	container: container,
	dataSet: boxes
}
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
	//res.sendFile(path.join(__dirname, 'uploadFile.html'));
	options = {
		args: [JSON.stringify(project)],
		pythonOptions: ["-u"], // The '-u' tells Python to flush every time // get print results in real-time
	};

	PythonShell.run("algo.py", options, function (err, result) {
		if (err)
			console.log(err.message);
		else {
			console.log(JSON.parse(JSON.stringify(result)));
			//console.log(JSON.stringify(result));
			// the result is already an object. not a string!
			console.log(result);
		}
	});
	console.log('done');
	res.sendStatus(200);
});


app.post('/test', (req, res) => {
    //console.log(typeof(req.body));
	options = {
		args: [JSON.stringify(req.body)],
		pythonOptions: ["-u"], // The '-u' tells Python to flush every time // get print results in real-time
	};

	PythonShell.run("algo.py", options, function (err, result) {
		if (err)
			res.sendStatus(500)
		else {
			//console.log(JSON.parse(JSON.stringify(result)));
			//console.log(JSON.stringify(result));
			
			// the result is already an object. not a string!
			res.send(result);
		}
	});
	console.log('done');
});

app.get("/get_data", (req, res) => {
	options = {
		args: [JSON.stringify(project)],
		pythonOptions: ["-u"], // The '-u' tells Python to flush every time // get print results in real-time
	};
	
	let shell = new PythonShell("algo.py", options);
	shell.on("message", function (message) {
		res.send(message);
	});
});

app.get("/get_data2", (req, res) => {
	options = {
		args: ["value1", "value2", "value3"],
		pythonOptions: ["-u"], // The '-u' tells Python to flush every time // get print results in real-time
	};

	PythonShell.run("algo.py", null, function (err, resulsts) {
		if (err) throw err;
		res.send(resulsts);
		console.log("finished");
	});
});

app.get("/hello", (req, res) => {
	res.send("hello world");
});

app.post("/api/getlength", (req, res) => {
	console.log(req.body);
	try {
		const str = req.body.inputString;
		const len = str.length;
		res.json({ status: "ok", data: { length: len } });
	} catch (e) {
		res.json({ status: "error", error: "some error" });
	}
});

app.listen(1337, () => {
	console.log("listening on port 1337");
});
