import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { Projects } from "./components/Projects/Projects";
import { Solutions } from "./components/Projects/Solutions";
import { Project } from "./components/Projects/Project";
import { NewProject } from "./components/NewProject/NewProject";
import { FileUpload } from "./components/NewProject/FileUpload/FileUpload";
import { ProjectProvider } from "./components/ProjectProvider";
import { UserDataProvider } from "./components/UserDataProvider";
import { EditContainer } from "./components/NewProject/EditContainer";
import { EditBoxes } from "./components/NewProject/EditBoxes";
import { FileDataProvider } from "./components/FileDataProvider";
import { View } from "./components/Visual/View";
import { Header } from "./components/Header";

function App() {
	return (
		<div className="App">
			<UserDataProvider>
				<FileDataProvider>
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
								path="/project"
								element={<Project />}
							/>
							<Route
								path="/view"
								element={<View />}
							/>
							<Route
								path="/new_project"
								element={<NewProject />}
							/>
							<Route
								path="/file_upload"
								element={<FileUpload />}
							/>
							<Route
								path="/edit_container"
								element={<EditContainer />}
							/>
							<Route
								path="/edit_boxes"
								element={<EditBoxes />}
							/>
							<Route
								path="/file_upload"
								element={<FileUpload />}
							/>
						</Routes>
					</ProjectProvider>
				</FileDataProvider>
			</UserDataProvider>
		</div>
	);
}

export default App;
