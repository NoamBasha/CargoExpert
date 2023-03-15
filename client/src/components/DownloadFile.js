export const DownloadFile = () => {
	const handleClick = async (e) => {
		//TODO: e.preventDefault();
		try {
			let data = await fetch("http://localhost:1337/user_input_example");
			let json_data = await data.json();
			console.log(json_data);
		} catch (err) {
			alert("Could not download file, server disconnected");
		}
	};

	return (
		<div>
			<button onClick={handleClick}>
				Click Here To Download Example File
			</button>
		</div>
	);
};
