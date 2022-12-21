// Now we need to create the express server

let PythonShellLibrary = require("python-shell");
let { PythonShell } = PythonShellLibrary;

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/get_data", (req, res) => {
	options = {
		args: ["value1", "value2", "value3"],
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
