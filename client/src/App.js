import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Projects } from "./components/Projects";
import { Project } from "./components/Project";

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
			</Routes>
		</div>
	);
}

export default App;
