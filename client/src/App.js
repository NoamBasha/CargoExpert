import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Project } from "./components/Project";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={<Project />}
				/>
			</Routes>
		</div>
	);
}

export default App;
