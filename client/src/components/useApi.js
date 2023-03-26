export const useApi = ({ setData, setIsLoading, setError }) => {
	const createUser = async ({ email, password }) => {
		setError("");
		setIsLoading(true);
		try {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			};
			await fetch("http://localhost:1337/register", requestOptions);
			//await fetch("http://localhost:1337/createUser", requestOptions);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const readUser = async ({ email, password }) => {
		setError("");
		setIsLoading(true);
		try {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			};
			let data = await fetch(
				"http://localhost:1337/getUser",
				requestOptions
			);
			/*
			let data = await fetch(
				"http://localhost:1337/readUser",
				requestOptions
			);
            */
			data = await data.json();
			setData(data);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const updateUser = async ({ email, password, new_projects }) => {
		setError("");
		setIsLoading(true);
		try {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email,
					password: password,
					newProjects: new_projects,
				}),
			};
			await fetch("http://localhost:1337/updateProjects", requestOptions);
			//await fetch("http://localhost:1337/updateUser", requestOptions);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const deleteUser = async ({ email, password }) => {
		setError("");
		setIsLoading(true);
		try {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			};
			await fetch("http://localhost:1337/deleteUser", requestOptions);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const getSolutions = async ({ data }) => {
		setError("");
		setIsLoading(true);
		try {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			};

			let data = await fetch(
				"http://localhost:1337/getSolutions",
				requestOptions
			);
			/*
			let data = await fetch(
				"http://localhost:1337/get_solutions",
				requestOptions
			);
            */
			data = await data.json();
			setData(data);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		createUser,
		readUser,
		updateUser,
		deleteUser,
		getSolutions,
	};
};
