export const FileUploadButton = ({ setFile }) => {
	const fileHandler = (event) => {
		let uploaded_files = event.target.files;
		if (uploaded_files.length != 1) {
			alert("Upload a single file");
			return;
		}
		setFile(uploaded_files[0]);
	};

	return (
		<div>
			<input
				type="file"
				name="user_input"
				accept=".csv"
				onChange={fileHandler}
			/>
		</div>
	);
};
