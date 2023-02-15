// Now we need to create the express server

let PythonShellLibrary = require("python-shell");
let { PythonShell } = PythonShellLibrary;

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { debug } = require("console");
const { exit } = require("process");

const boxes_2 = [
	{
		size: [2, 2, 5],
		position: [1, 1, 2.5],
		color: "#00BCFF",
		text: "Box0",
	},
	{
		size: [2, 2, 5],
		position: [3, 1, 2.5],
		color: "#00BCFF",
		text: "Box1",
	},
	{
		size: [2, 2, 5],
		position: [1, 3, 2.5],
		color: "#00BCFF",
		text: "Box2",
	},
	{
		size: [2, 2, 5],
		position: [1, 1, 7.5],
		color: "#00BCFF",
		text: "Box3",
	},
	{
		size: [2, 2, 5],
		position: [1, 3, 7.5],
		color: "#00BCFF",
		text: "Box4",
	},
	{
		size: [2, 2, 5],
		position: [3, 1, 7.5],
		color: "#00BCFF",
		text: "Box5",
	},

	{
		size: [1, 1, 2.5],
		position: [2.5, 2.5, 1.25],
		color: "#00ffbc",
		text: "Box6",
	},
	{
		size: [1, 1, 2.5],
		position: [2.5, 2.5, 3.75],
		color: "#00ffbc",
		text: "Box7",
	},
	{
		size: [1, 1, 2.5],
		position: [2.5, 2.5, 6.25],
		color: "#00ffbc",
		text: "Box8",
	},
	{
		size: [1, 1, 2.5],
		position: [2.5, 2.5, 8.75],
		color: "#00ffbc",
		text: "Box9",
	},
];

const boxes = [
	{
		order: 2,
		type: "Box2",
		width: 2,
		height: 2,
		length: 5,
	},
	{
		order: 3,
		type: "Box3",
		width: 2,
		height: 2,
		length: 5,
	},
	{
		order: 4,
		type: "Box4",
		width: 2,
		height: 2,
		length: 5,
	},
	{
		order: 0,
		type: "Box0",
		width: 2,
		height: 2,
		length: 5,
	},
	{
		order: 1,
		type: "Box1",
		width: 2,
		height: 2,
		length: 5,
	},
];

/**
 * 
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
 */

const container = {
	width: 30,
	height: 40,
	length: 100,
};

const project = {
	container: container,
	boxes: boxes,
};

const noam1303 = {
	container: { width: 3, height: 1, length: 1 },
	boxes: [
		{
			order: 1,
			type: "Box1",
			size: [1, 1, 1],
			position: [1, 1, 1],
		},
	],
};

const test_noam1302algo = {
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

const test_noam1302 = {
	container: { width: 3, height: 1, length: 1 },
	boxes: [
		{
			id: 1,
			text: "Box1",
			width: 1,
			height: 1,
			length: 1,
			color: "gray",
			size: [1, 1, 1],
			position: [1, 1, 1],
		},

		{
			id: 2,
			text: "Box2",
			width: 1,
			height: 1,
			length: 1,
			color: "gray",
			size: [1, 1, 1],
			position: [1, 2, 1],
		},

		{
			id: 3,
			text: "Box3",
			width: 1,
			height: 1,
			length: 1,
			color: "gray",
			size: [1, 1, 1],
			position: [2, 1, 1],
		},
	],
};

const test_1 = {
	container: { width: 3, height: 1, length: 1 },
	boxes: [
		{
			order: 1,
			type: "Box1",
			width: 1,
			height: 1,
			length: 1,
			color: "gray",
		},

		{
			order: 2,
			type: "Box2",
			width: 1,
			height: 1,
			length: 1,
			color: "gray",
		},

		{
			order: 3,
			type: "Box3",
			width: 1,
			height: 1,
			length: 1,
			color: "gray",
		},
	],
};

const test_2 = {
	container: { width: 1, height: 3, length: 1 },
	boxes: [
		{ order: 1, type: "Box1", width: 1, height: 1, length: 1 },

		{ order: 2, type: "Box2", width: 1, height: 1, length: 1 },

		{ order: 3, type: "Box3", width: 1, height: 1, length: 1 },
	],
};

const test_3 = {
	container: { width: 1, height: 1, length: 3 },
	boxes: [
		{ order: 1, type: "Box1", width: 1, height: 1, length: 1 },

		{ order: 2, type: "Box2", width: 1, height: 1, length: 1 },

		{ order: 3, type: "Box3", width: 1, height: 1, length: 1 },
	],
};

const test_4 = {
	container: { width: 2, height: 2, length: 2 },
	boxes: [{ order: 1, type: "Box1", width: 2, height: 2, length: 2 }],
};

const test_5 = {
	container: { width: 4, height: 2, length: 2 },
	boxes: [
		{ order: 1, type: "Box1", width: 2, height: 2, length: 2 },
		{ order: 2, type: "Box2", width: 2, height: 2, length: 2 },
	],
};

const test_6 = {
	container: { width: 6, height: 1, length: 6 },
	boxes: [
		{ order: 1, type: "Box1", width: 2, height: 1, length: 2 },
		{ order: 2, type: "Box2", width: 2, height: 1, length: 2 },
		{ order: 3, type: "Box3", width: 2, height: 1, length: 2 },
		{ order: 4, type: "Box4", width: 2, height: 1, length: 2 },
		{ order: 5, type: "Box5", width: 2, height: 1, length: 2 },
		{ order: 6, type: "Box6", width: 2, height: 1, length: 2 },
		{ order: 7, type: "Box7", width: 2, height: 1, length: 2 },
		{ order: 8, type: "Box8", width: 2, height: 1, length: 2 },
		{ order: 9, type: "Box9", width: 2, height: 1, length: 2 },
	],
};

const test_7 = {
	container: { width: 4, height: 4, length: 4 },
	boxes: [
		{ order: 1, type: "Box1", width: 2, height: 2, length: 2 },
		{ order: 2, type: "Box2", width: 2, height: 2, length: 2 },
		{ order: 3, type: "Box3", width: 2, height: 2, length: 2 },
		{ order: 4, type: "Box4", width: 2, height: 2, length: 2 },
		{ order: 5, type: "Box5", width: 2, height: 2, length: 2 },
		{ order: 6, type: "Box6", width: 2, height: 2, length: 2 },
		{ order: 7, type: "Box7", width: 2, height: 2, length: 2 },
		{ order: 8, type: "Box8", width: 2, height: 2, length: 2 },
	],
};

const test_8 = {
	container: { width: 4, height: 12, length: 8 },
	boxes: [
		{
			order: 1,
			type: "Box1",
			width: 1,
			height: 4,
			length: 4,
			color: "gray",
		},
		{
			order: 2,
			type: "Box2",
			width: 2,
			height: 4,
			length: 2,
			color: "gray",
		},
		{
			order: 3,
			type: "Box3",
			width: 1,
			height: 4,
			length: 4,
			color: "gray",
		},
		{
			order: 4,
			type: "Box4",
			width: 2,
			height: 4,
			length: 2,
			color: "gray",
		},
		{
			order: 5,
			type: "Box5",
			width: 2,
			height: 4,
			length: 2,
			color: "light-gray",
		},
		{
			order: 6,
			type: "Box6",
			width: 2,
			height: 4,
			length: 2,
			color: "gray",
		},
		{
			order: 7,
			type: "Box7",
			width: 2,
			height: 4,
			length: 2,
			color: "gray",
		},
		{
			order: 8,
			type: "Box8",
			width: 2,
			height: 4,
			length: 2,
			color: "light-gray",
		},
		{
			order: 9,
			type: "Box9",
			width: 2,
			height: 4,
			length: 2,
			color: "light-gray",
		},
		{
			order: 10,
			type: "Box01",
			width: 2,
			height: 4,
			length: 2,
			color: "light-gray",
		},
		{
			order: 11,
			type: "Box11",
			width: 2,
			height: 4,
			length: 2,
			color: "light-gray",
		},
		{
			order: 12,
			type: "Box12",
			width: 2,
			height: 4,
			length: 2,
			color: "light-gray",
		},
		{
			order: 13,
			type: "Box13",
			width: 2,
			height: 4,
			length: 2,
			color: "light-gray",
		},
		{
			order: 14,
			type: "Box14",
			width: 2,
			height: 4,
			length: 2,
			color: "light-gray",
		},
		{
			order: 15,
			type: "Box15",
			width: 2,
			height: 4,
			length: 2,
			color: "light-gray",
		},
		{
			order: 16,
			type: "Box16",
			width: 2,
			height: 4,
			length: 2,
			color: "light-gray",
		},
	],
};

const answers = [
	"[([1 (0, 0, 0), 2 (2, 0, 0), 3 (1, 0, 0)], {'number_of_items': 3, 'capacity': 3})]",
	"[([1 (0, 0, 0), 2 (0, 1, 0), 3 (0, 2, 0)], {'number_of_items': 3, 'capacity': 3})]",
	"[([1 (0, 0, 0), 2 (0, 0, 1), 3 (0, 0, 2)], {'number_of_items': 3, 'capacity': 3})]",
	"[([1 (0, 0, 0)], {'number_of_items': 1, 'capacity': 8})]",
	"[([1 (0, 0, 0), 2 (2, 0, 0)], {'number_of_items': 2, 'capacity': 16})]",
	"[([1 (0, 0, 0), 2 (4, 0, 0), 3 (2, 0, 0), 4 (0, 0, 2), 5 (4, 0, 2), 6 (2, 0, 2), 7 (4, 0, 4), 8 (0, 0, 4), 9 (2, 0, 4)], {'number_of_items': 9, 'capacity': 36})]",
	"[([1 (0, 0, 0), 2 (2, 0, 0), 3 (2, 2, 0), 4 (0, 2, 0), 5 (0, 0, 2), 6 (2, 0, 2), 7 (0, 2, 2), 8 (2, 2, 2)], {'number_of_items': 8, 'capacity': 64})]",
];
app.use(cors());
app.use(express.json());

app.get("/noam_test", (req, res) => {
	console.log(res);
	res.send(test_noam1302algo);
});

app.get("/noam1302", (req, res) => {
	//res.sendFile(path.join(__dirname, 'uploadFile.html'));
	options = {
		args: [JSON.stringify(test_noam1302algo)],
		pythonOptions: ["-u"], // The '-u' tells Python to flush every time // get print results in real-time
	};
	PythonShell.run("algo2.py", options, function (err, result) {
		if (err) {
			console.log(err.traceback);
		} else {
			res.send(result);
			console.log(result);
		}
	});
});

app.get("/test", (req, res) => {
	//res.sendFile(path.join(__dirname, 'uploadFile.html'));
	options = {
		args: [JSON.stringify(test_8)],
		pythonOptions: ["-u"], // The '-u' tells Python to flush every time // get print results in real-time
	};

	PythonShell.run("algo.py", options, function (err, result) {
		err ? console.log(err.traceback) : console.log(result);
	});
	console.log("done");
	res.sendStatus(200);
});

app.post("/test", (req, res) => {
	//console.log(typeof(req.body));
	options = {
		args: [JSON.stringify(req.body)],
		pythonOptions: ["-u"], // The '-u' tells Python to flush every time // get print results in real-time
	};

	PythonShell.run("algo.py", options, function (err, result) {
		if (err) res.sendStatus(500);
		else {
			//console.log(JSON.parse(JSON.stringify(result)));
			//console.log(JSON.stringify(result));

			// the result is already an object. not a string!
			res.send(result);
		}
	});
	console.log("done");
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
