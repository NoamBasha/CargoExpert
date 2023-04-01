import { useState } from "react";
import { BoxesTable } from "./BoxesTable.js";
import { BoxesTableImproved } from "./BoxesTableImproved.js";
import { BoxForm } from "./BoxForm";
import { useUserData } from "../../UserDataProvider";
import { useNavigate } from "react-router-dom";
import { Button, Alert, CircularProgress } from "@mui/material";

export const EditBoxes = ({ setStage, boxes, setBoxes, container }) => {
	const [selectedOrders, setSelecetedOrders] = useState([]);
	const { addProject, isLoading, error } = useUserData();
	const navigate = useNavigate();

	const stringToColour = function (str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		let colour = "#";
		for (let i = 0; i < 3; i++) {
			let value = (hash >> (i * 8)) & 0xff;
			colour += ("00" + value.toString(16)).substr(-2);
		}
		return colour;
	};

	const editSelectedOrders = (newBox) => {
		const newBoxes = boxes.map((box) =>
			selectedOrders.includes(box.order) ? newBox : box
		);
		setBoxes(newBoxes);
	};

	const handleAddProject = async (e) => {
		let project_boxes = boxes.map((box) => {
			return { ...box, color: stringToColour(box.type) };
		});

		await addProject({
			container: container,
			boxes: project_boxes,
			solutions: [],
		});
		navigate("/projects");
	};

	return (
		<div>
			<BoxesTableImproved
				boxes={boxes}
				selectedOrders={selectedOrders}
				setSelecetedOrders={setSelecetedOrders}
			/>

			<br />

			{selectedOrders.length == 0 ? null : (
				<BoxForm
					boxes={boxes}
					selectedOrders={selectedOrders}
					editBox={editSelectedOrders}
				/>
			)}

			{error && (
				<Alert
					severity="error"
					className="mt-3"
				>
					{error}
				</Alert>
			)}

			<br />

			{isLoading ? (
				<CircularProgress />
			) : (
				<Button onClick={handleAddProject}>Create Project!</Button>
			)}
		</div>
	);
};
