export const userInputExample = (req, res) => {
	const downloadFilePath = "./user_input_example.csv";
	const downloadFileError =
		"Can't download file at this time. Please try again later";

	try {
		res.download(downloadFilePath);
	} catch (err) {
		res.status(400).json({
			error: downloadFileError,
		});
	}
};

export const serverListen = (port) => {
	console.log(`listening on port ${port}`);
};
