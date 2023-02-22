import { View } from "./View.js";
import { BoxesProvider } from "./BoxesProvider";
import { FileUpload } from "./FileUpload";

export const Project = () => {
	return (
		<div>
			<BoxesProvider>
				<FileUpload></FileUpload>
				<View></View>
			</BoxesProvider>
		</div>
	);
};
