import { ThreeScene } from "./ThreeScene.js";
import { Button } from "@mui/material";
import { EditPanel } from "./EditPanel.js";
import { useEdit } from "./EditProvider.js";
import { BoxesViewTableImproved } from "./BoxesViewTableImproved.js";
import { CircularProgress } from "@mui/material";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FileDownload from "js-file-download";

import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { ExplanationIcon } from "../../ExplanationIcon.js";

import { toast } from "react-toastify";

import {
	isBoxesOutOfBounds,
	isBoxesOverlapping,
	isBoxesHovering,
} from "./validations.js";

import { useSelector, useDispatch } from "react-redux";
import {
	selectProjectId,
	selectProjectName,
	selectProjectContainer,
	selectProjectBoxes,
	selectProjectSolutions,
} from "../../../features/project/projectSlice.js";

import {
	selectSolutionId,
	selectSolutionName,
	selectSolutionBoxes,
	deselectBoxes,
	setSolutionById,
	reset,
	updateSolution,
	improveSolution,
} from "../../../features/solution/solutionSlice.js";
import { selectIsLoading } from "../../../features/projects/projectsSlice.js";

import { toggleIsIn } from "../../../features/solution/solutionSlice.js";

import { getBoxRotatedSize, getRotatedSizeBoxes } from "../../../utils.js";

const VIEW_EXPLANATION_TEXT = `Container:
- You can use your left and right mouse buttons to change the angle you see the container.
- You can scroll in and out to change the zoom level of the container.
Boxes Tables:
- You can see which boxes are in the solution and which are not.
Bottom Buttons:
- BACK is used to go back to the solutions screen.
- DOWNLOAD is used to download the current solution.
- EDIT is used to edit the current solution.
- SAVE is used to save the changes you made on the edit screen.
- IMPROVE is used to let the algorithm try and improve your solution.
`;

const EDIT_EXPLANATION_TEXT = `Container:
- You can use your left and right mouse buttons to change the angle you see the container.
- You can scroll in and out to change the zoom level of the container.
- You can press on one or multiple boxes to move it around using the edit panel.
Boxes Tables:
- You can see which boxes are in the solution and which are not.
- You can add and remove boxes from the solution.
Bottom Buttons:
- VIEW is used to go back to the view screen.
Edit Panel:
- The three colors - red, green and blue are complatibe to the axes colors.
- You can use the arrow buttons to move the selected boxes in the container.
- You can determine the step size of the boxes by adjusting the sliders.
Edit Panel Buttons:
- REMOVE is used to remove all slected boxes form the solution.
- RESET is used to reset the solution to the initial state.
- DESELECT is used to deselect all boxes that are currently selected.
`;

const EditButton = ({ onClick, text, style }) => {
	return (
		<Button
			style={style}
			sx={{
				fontSize: "16px",
			}}
			onClick={() => onClick()}
		>
			{text}
		</Button>
	);
};

const ViewButton = ({ deselectBoxes, setEdit, validateBoxesLocation }) => {
	const dispatch = useDispatch();
	return (
		<Button
			onClick={() => {
				if (validateBoxesLocation()) {
					dispatch(deselectBoxes());
					setEdit();
				}
			}}
		>
			View
		</Button>
	);
};

export const View = () => {
	const dispatch = useDispatch();
	const { edit, setEdit } = useEdit();

	const projectBoxes = useSelector(selectProjectBoxes);
	const solutions = useSelector(selectProjectSolutions);
	const currentSolutionId = useSelector(selectSolutionId);
	const container = useSelector(selectProjectContainer);
	const boxes = useSelector(selectSolutionBoxes);
	const inBoxes = boxes.filter((box) => box.isIn === true);
	const outBoxes = boxes.filter((box) => box.isIn === false);
	const solutionId = useSelector(selectSolutionId);
	const isLoading = useSelector(selectIsLoading);
	const projectName = useSelector(selectProjectName);
	const solutionName = useSelector(selectSolutionName);
	const solutionDetails = `${projectName} - ${solutionName}`;

	const validateBoxesLocation = (inBoxes, container) => {
		const rotatedBoxes = getRotatedSizeBoxes(inBoxes);
		return () => {
			if (isBoxesOutOfBounds(rotatedBoxes, container)) {
				toast.error("Not all of the boxes are inside the container");
			} else if (isBoxesOverlapping(rotatedBoxes)) {
				toast.error("There are boxes overlapping");
			} else if (isBoxesHovering(rotatedBoxes)) {
				toast.error("There are boxes hovering");
			} else {
				return true;
			}
			return false;
		};
	};

	const handleSaveSolution = async () => {
		let newSolution = solutions.find(
			(solution) => solution._id === solutionId
		);
		if (!newSolution) return;

		newSolution = {
			...newSolution,
			boxes: boxes,
		};

		try {
			await dispatch(
				updateSolution({ solutionId, newSolution })
			).unwrap();
		} catch (error) {
			toast.error(error);
		}
	};

	const handleImproveSolution = async () => {
		try {
			await dispatch(improveSolution({ solutionId })).unwrap();
		} catch (error) {
			toast.error(error);
		}
	};

	const downloadSolutionAsCSV = () => {
		const convertToCSV = (array, isIn) => {
			const csvRows = [];

			// Add data rows
			for (const item of array) {
				const order = item.order;
				const rotatedSize = getBoxRotatedSize(item);
				const position = isIn
					? [
							item.position.x - 0.5 * rotatedSize.width,
							item.position.y - 0.5 * rotatedSize.height,
							item.position.z - 0.5 * rotatedSize.length,
					  ]
					: ["-", "-", "-"];

				const boxIsIn = item.isIn;
				const values = [
					order,
					...position,
					...Object.values(rotatedSize),
					boxIsIn,
				];
				csvRows.push(values.join(","));
			}

			// Join rows with newlines
			return csvRows.join("\n");
		};

		const downloadCSV = (fileName) => {
			const headerCSV = `order,x,y,z,width,height,length,isIn`;
			const containerAsCSV = `container,-,-,-,${container.width}, ${container.height}, ${container.length},-`;
			const inBoxesAsCSV = convertToCSV(inBoxes, true);
			const outBoxesAsCSV = convertToCSV(outBoxes, false);
			const finalCSV =
				headerCSV +
				"\n" +
				containerAsCSV +
				"\n" +
				inBoxesAsCSV +
				"\n" +
				outBoxesAsCSV;
			FileDownload(finalCSV, fileName);
		};

		downloadCSV(`${solutionDetails}.csv`);
	};

	return (
		<div
			style={{ height: "90vh" }}
			className="d-flex flex-column position-relative"
		>
			<h1
				className="position-absolute"
				style={{
					fontWeight: "bold",
					fontSize: "24px",
					top: "10px",
					left: "50%",
					transform: "translate(-50%, 0)",
				}}
			>
				{solutionDetails}
			</h1>

			<div
				style={{ height: "80vh" }}
				className="position-relative d-flex flex-row justify-content-between align-items-center"
			>
				{edit ? null : (
					<Button
						onClick={() => {
							const solutionIndex = solutions.findIndex(
								(solution) => solution._id === currentSolutionId
							);
							const newIndex =
								(solutionIndex - 1 + solutions.length) %
								solutions.length;

							const solutionId = solutions[newIndex]._id;
							dispatch(
								setSolutionById({
									solutionId,
									solutions,
									projectBoxes,
								})
							);
						}}
						className="position-absolute d-flex"
						style={{ top: 380, left: 10, zIndex: 1 }}
					>
						<ArrowBackIosOutlinedIcon
							color="primary"
							size="small"
						></ArrowBackIosOutlinedIcon>
					</Button>
				)}

				<ThreeScene container={container}>
					{edit ? (
						<div
							className="w-25 position-absolute d-flex flex-row-reverse"
							style={{ top: 30, right: 100, zIndex: 1 }}
						>
							<EditPanel
								maxStepSize={
									Math.max(...Object.values(container)) / 2
								}
							/>
						</div>
					) : null}
					<div
						className="w-25 position-absolute d-flex flex-column"
						style={{ top: 10, left: 100, zIndex: 1 }}
					>
						<BoxesViewTableImproved
							isEdit={edit}
							boxes={inBoxes}
							toggleIsIn={toggleIsIn}
							isIn={true}
						/>
						<br />
						<BoxesViewTableImproved
							isEdit={edit}
							boxes={outBoxes}
							toggleIsIn={toggleIsIn}
							isIn={false}
						/>
					</div>
				</ThreeScene>

				{edit ? null : (
					<Button
						onClick={() => {
							const solutionIndex = solutions.findIndex(
								(solution) => solution._id === currentSolutionId
							);
							const newIndex =
								(solutionIndex + 1) % solutions.length;
							const solutionId = solutions[newIndex]._id;
							dispatch(
								setSolutionById({
									solutionId,
									solutions,
									projectBoxes,
								})
							);
						}}
						className="position-absolute d-flex"
						style={{ top: 380, right: 10, zIndex: 1 }}
					>
						<ArrowForwardIosOutlinedIcon
							color="primary"
							size="small"
						></ArrowForwardIosOutlinedIcon>
					</Button>
				)}
			</div>
			<div
				style={{ height: "10vh", width: "40%" }}
				className="d-flex justify-content-around mx-auto align-items-center  position-relative"
			>
				<Container className="w-100">
					<Row className="w-100">
						{edit ? (
							<ViewButton
								deselectBoxes={() => deselectBoxes()}
								setEdit={() => setEdit(false)}
								validateBoxesLocation={validateBoxesLocation(
									inBoxes,
									container
								)}
							/>
						) : (
							<>
								<Col className="d-flex justify-content-center">
									<EditButton
										onClick={(e) => dispatch(reset())}
										text={"Back"}
									></EditButton>
								</Col>
								<Col className="d-flex justify-content-center">
									{isLoading ? (
										<CircularProgress />
									) : (
										<EditButton
											onClick={(e) =>
												downloadSolutionAsCSV(e)
											}
											text={"Download"}
										></EditButton>
									)}
								</Col>
								<Col className="d-flex justify-content-center">
									<EditButton
										style={{ fontWeight: "bold" }}
										onClick={() => setEdit(true)}
										text={"Edit"}
									/>
								</Col>
								<Col className="d-flex justify-content-center">
									{isLoading ? (
										<CircularProgress />
									) : (
										<EditButton
											onClick={() => handleSaveSolution()}
											text={"Save"}
										></EditButton>
									)}
								</Col>

								<Col className="d-flex justify-content-center">
									{isLoading ? (
										<CircularProgress />
									) : (
										<EditButton
											onClick={() =>
												handleImproveSolution()
											}
											text={"Improve"}
										></EditButton>
									)}
								</Col>
							</>
						)}
					</Row>
				</Container>
				<ExplanationIcon
					explanationHeader={edit ? "Edit Screen" : "View Screen"}
					explanationText={
						edit ? EDIT_EXPLANATION_TEXT : VIEW_EXPLANATION_TEXT
					}
					type={"dialog"}
					style={{
						position: "absolute",
						top: "27.5%",
						right: "-72%",
					}}
				/>
			</div>
		</div>
	);
};
