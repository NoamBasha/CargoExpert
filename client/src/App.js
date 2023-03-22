import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

import { Projects } from "./components/Projects";
import { Solutions } from "./components/Solutions";
import { Project } from "./components/Project";
import { NewProject } from "./components/NewProject";
import { FileUpload } from "./components/FileUpload";
import { ProjectProvider } from "./components/ProjectProvider";
import { UserDataProvider } from "./components/UserDataProvider";
import { EditContainer } from "./components/EditContainer";
import { EditBoxes } from "./components/EditBoxes";
import { FileDataProvider } from "./components/FileDataProvider";
import { View } from "./components/View";

function App() {
	return (
		<div className="App">
			<UserDataProvider>
				<FileDataProvider>
					<ProjectProvider>
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
