import { View } from "./View.js";
import { BoxesProvider } from "./BoxesProvider";
import { FileUpload } from "./FileUpload";
import { DragAndDrop } from "./DragAndDrop.js";

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
