import logo from "./logo.svg";
import "./App.css";
import { View } from "./components/View.js";
import { BoxesProvider } from "./components/BoxesProvider";
import { FileUpload } from "./components/FileUpload";

function App() {
	return (
		/* react-router... */
		<div className="App">
			<BoxesProvider>
				<FileUpload></FileUpload>
				<View></View>
			</BoxesProvider>
		</div>
	);
}

export default App;
