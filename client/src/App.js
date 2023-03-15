import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Projects } from "./components/Projects";
import { Project } from "./components/Project";
import { NewProject } from "./components/NewProject";
import { FileUpload } from "./components/FileUpload";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={<Login />}
				/>
				<Route
					path="/projects"
					element={<Projects />}
				/>
				<Route
					path="/project"
					element={<Project />}
				/>
				<Route
					path="/new_project"
					element={<NewProject />}
				/>

				<Route
					path="/file_upload"
					element={<FileUpload />}
				/>
			</Routes>
		</div>
	);
}

export default App;
