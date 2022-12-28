import logo from "./logo.svg";
import "./App.css";
import { View } from "./components/View.js";
import { BoxesProvider } from "./components/BoxesProvider";

function App() {
	return (
		/* react-router... */
		<div className="App">
			<BoxesProvider>
				<View></View>
			</BoxesProvider>
		</div>
	);
}

export default App;
