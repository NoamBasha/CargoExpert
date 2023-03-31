export const DragAndDrop = ({ setFile, children }) => {
	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleDrop = (event) => {
		event.preventDefault();
		let uploaded_files = event.dataTransfer.files;
		if (uploaded_files.length !== 1) {
			alert("Upload a single file");
			return;
		}
		console.log(uploaded_files[0]);
		setFile(uploaded_files[0]);
	};

	return (
		<div
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<h1>Drag and Drop Your File here</h1>
			{children}
		</div>
	);
};
