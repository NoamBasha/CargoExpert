import { useState, createContext, useContext } from "react";

const FileDataContext = createContext("");

export const FileDataProvider = ({ children }) => {
	const [container, setContainer] = useState([]);
	const [boxes, setBoxes] = useState([]);

	return (
		<FileDataContext.Provider
			value={{
				container,
				setContainer,
				boxes,
				setBoxes,
			}}
		>
			{children}
		</FileDataContext.Provider>
	);
};

export const useFileData = () => useContext(FileDataContext);
