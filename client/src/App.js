import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { Projects } from "./components/Projects/Projects";
import { Solutions } from "./components/Projects/Solutions";
import { NewProject } from "./components/NewProject/NewProject";
import { ProjectProvider } from "./components/ProjectProvider";
import { UserDataProvider } from "./components/UserDataProvider";
import { View } from "./components/Visual/View";
import { Header } from "./components/Header";

function App() {
	return (
		<div className="App">
			<UserDataProvider>
				<ProjectProvider>
					<Header />
					<Routes>
						<Route
							path="/"
							element={<Login />}
						/>
						<Route
							path="/register"
							element={<Register />}
						/>
						<Route
							path="/projects"
							element={<Projects />}
						/>
						<Route
							path="/solutions"
							element={<Solutions />}
						/>
						<Route
							path="/view"
							element={<View />}
						/>
						<Route
							path="/new_project"
							element={<NewProject />}
						/>
					</Routes>
				</ProjectProvider>
			</UserDataProvider>
		</div>
	);
}

export default App;
