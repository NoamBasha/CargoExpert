import { Button } from "@mui/material";

const ContainerButton = ({ size, text, setStandardContainer }) => {
	return (
		<Button onClick={() => setStandardContainer(size)}>
			{text}
			<br />
			{Object.values(size).join(", ")}
		</Button>
	);
};

export const StandardContainers = ({ setStandardContainer }) => {
	return (
		<div className="d-flex justify-content-between mb-3">
			<ContainerButton
				size={{
					width: 2,
					height: 2,
					length: 6,
				}}
				text={"Small Size"}
				setStandardContainer={setStandardContainer}
			/>
			<ContainerButton
				size={{
					width: 2,
					height: 2,
					length: 12,
				}}
				text={"Medium Size"}
				setStandardContainer={setStandardContainer}
			/>
			<ContainerButton
				size={{
					width: 2,
					height: 3,
					length: 12,
				}}
				text={"Large Size"}
				setStandardContainer={setStandardContainer}
			/>
		</div>
	);
};
