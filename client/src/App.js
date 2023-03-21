import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Projects } from "./components/Projects";
import { Project } from "./components/Project";
import { NewProject } from "./components/NewProject";
import { FileUpload } from "./components/FileUpload";
import { BoxesProvider } from "./components/BoxesProvider";
import { UserDataProvider } from "./components/UserDataProvider";
import { EditContainer } from "./components/EditContainer";
import { EditBoxes } from "./components/EditBoxes";
import { FileDataProvider } from "./components/FileDataProvider";

function App() {
	return (
		<div className="App">
			<UserDataProvider>
				<FileDataProvider>
					<BoxesProvider>
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
					</BoxesProvider>
				</FileDataProvider>
			</UserDataProvider>
		</div>
	);
}

export default App;
