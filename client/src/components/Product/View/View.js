import { ThreeScene } from "./ThreeScene.js";
import { useProject } from "../ProjectProvider.js";
import { Button } from "@mui/material";
import { EditPanel } from "./EditPanel.js";
import { useEdit } from "./EditProvider.js";
import { BoxesViewTable } from "./BoxesViewTable.js";
import { BoxesViewTableImproved } from "./BoxesViewTableImproved.js";
import { useUserData } from "../../UserDataProvider.js";
import ButtonGroup from "@mui/material/ButtonGroup";
import { CircularProgress } from "@mui/material";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FileDownload from "js-file-download";

import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { ExplanationIcon } from "../../ExplanationIcon.js";

const viewExplanationText = `Container:
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

const editExplanationText = `Container:
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
	return (
		<Button
			onClick={() => {
				if (validateBoxesLocation()) {
					deselectBoxes();
					setEdit();
				}
			}}
		>
			View
		</Button>
	);
};

export const View = () => {
	const { edit, setEdit } = useEdit();
	const {
		inBoxes,
		outBoxes,
		getNextSolution,
		getPreviousSolution,
		container,
		saveSolution,
		deselectBoxes,
		setSolutionId,
		improveSolutionInView,
		toggleIsIn,
		getCurrentProjectName,
		getCurrentSolutionName,
	} = useProject();
	const { setCustomizedError, isLoading } = useUserData();

	const projectName = getCurrentProjectName();
	const solutionName = getCurrentSolutionName();
	const solutionDetails = `${projectName} - ${solutionName}`;

	// returns true if there is a box that is out of bounds
	// return false if everything is ok
	const isBoxesOutOfBounds = (inBoxes, container) => {
		const isOutOfBounds = inBoxes.some((box) => {
			const x_condiction =
				box.position[0] + 0.5 * box.size[0] > container[0] ||
				box.position[0] - 0.5 * box.size[0] < 0;
			const y_condiction =
				box.position[1] + 0.5 * box.size[1] > container[1] ||
				box.position[1] - 0.5 * box.size[1] < 0;
			const z_condiction =
				box.position[2] + 0.5 * box.size[2] > container[2] ||
				box.position[2] - 0.5 * box.size[2] < 0;
			return x_condiction || y_condiction || z_condiction;
		});
		return isOutOfBounds;
	};

	// return true if two boxes are overlapping
	const isTwoBoxesOverLapping = (box1, box2) => {
		const box1xMin = box1.position[0] - box1.size[0] / 2;
		const box1xMax = box1.position[0] + box1.size[0] / 2;
		const box2xMin = box2.position[0] - box2.size[0] / 2;
		const box2xMax = box2.position[0] + box2.size[0] / 2;

		// Check if boxes are separated along x axis
		if (box1xMax <= box2xMin || box2xMax <= box1xMin) {
			return false;
		}

		const box1yMin = box1.position[1] - box1.size[1] / 2;
		const box1yMax = box1.position[1] + box1.size[1] / 2;
		const box2yMin = box2.position[1] - box2.size[1] / 2;
		const box2yMax = box2.position[1] + box2.size[1] / 2;

		if (box1yMax <= box2yMin || box2yMax <= box1yMin) {
			return false;
		}

		const box1zMin = box1.position[2] - box1.size[2] / 2;
		const box1zMax = box1.position[2] + box1.size[2] / 2;
		const box2zMin = box2.position[2] - box2.size[2] / 2;
		const box2zMax = box2.position[2] + box2.size[2] / 2;

		if (box1zMax <= box2zMin || box2zMax <= box1zMin) {
			return false;
		}

		// If boxes are not separated along any axis, they must be overlapping
		return true;
	};

	// returns true if everything is ok
	const isBoxesOverlapping = (inBoxes) => {
		for (let i = 0; i < inBoxes.length; i++) {
			for (let j = i + 1; j < inBoxes.length; j++) {
				if (isTwoBoxesOverLapping(inBoxes[i], inBoxes[j])) {
					console.log(inBoxes[i], inBoxes[j]);
					return true;
				}
			}
		}
		return false;
	};

	const isBoxesHovering = (inBoxes) => {
		const getXs = (box, otherBox, i) => {
			const boxMin = box.flb.x;
			const boxMax = box.flb.x + box.size[i];
			const otherBoxMin = otherBox.flb.x;
			const otherBoxMax = otherBox.flb.x + otherBox.size[i];

			// Check if boxes are separated along x axis
			if (boxMax <= otherBoxMin || otherBoxMax <= boxMin) {
				return 0;
			}

			let min;
			if (boxMin <= otherBoxMin) {
				min = otherBoxMin;
			} else {
				min = boxMin;
			}

			let max;
			if (boxMax >= otherBoxMax) {
				max = otherBoxMax;
			} else {
				max = boxMax;
			}
			return max - min;
		};

		const getZs = (box, otherBox, i) => {
			const boxMin = box.flb.z;
			const boxMax = box.flb.z + box.size[i];
			const otherBoxMin = otherBox.flb.z;
			const otherBoxMax = otherBox.flb.z + otherBox.size[i];

			// Check if boxes are separated along x axis
			if (boxMax <= otherBoxMin || otherBoxMax <= boxMin) {
				return 0;
			}

			let min;
			if (boxMin <= otherBoxMin) {
				min = otherBoxMin;
			} else {
				min = boxMin;
			}

			let max;
			if (boxMax >= otherBoxMax) {
				max = otherBoxMax;
			} else {
				max = boxMax;
			}
			return max - min;
		};

		const getCoverage = (box, otherBox) => {
			if (box.flb.y !== otherBox.flb.y + otherBox.size[1]) {
				return 0;
			}

			let x_intersection = getXs(box, otherBox, 0);
			let z_intersection = getZs(box, otherBox, 2);

			return x_intersection * z_intersection;
		};

		const boxes_with_flb = inBoxes.map((box) => {
			let flb = {
				x: box.position[0] - box.size[0] / 2,
				y: box.position[1] - box.size[1] / 2,
				z: box.position[2] - box.size[2] / 2,
			};
			return { ...box, flb: flb };
		});

		for (let i = 0; i < boxes_with_flb.length; i++) {
			const box = boxes_with_flb[i];
			if (box.flb.y === 0) {
				continue;
			}
			let overall_coverage = 0;
			const area = box.size[0] * box.size[2];
			for (let j = 0; j < boxes_with_flb.length; j++) {
				if (j === i) {
					continue;
				}
				const otherBox = boxes_with_flb[j];
				let current_coverage = getCoverage(box, otherBox);
				overall_coverage += current_coverage;
			}
			if (overall_coverage !== area) {
				console.log(box.order, area, overall_coverage);
				return true;
			}
		}
		return false;
	};

	const validateBoxesLocation = (inBoxes, container) => {
		return () => {
			if (isBoxesOutOfBounds(inBoxes, container)) {
				setCustomizedError(
					"Not all of the boxes are inside the container"
				);
			} else if (isBoxesOverlapping(inBoxes, container)) {
				setCustomizedError("There are boxes overlapping");
			} else if (isBoxesHovering(inBoxes)) {
				setCustomizedError("There are boxes hovering");
			} else {
				return true;
			}
			return false;
		};
	};

	const handleSaveSolution = (e) => {
		e.preventDefault();
		saveSolution();
		console.log("Saving solution");
	};

	const downloadSolutionAsCSV = () => {
		const convertToCSV = (array, isIn) => {
			const csvRows = [];

			// Add data rows
			for (const item of array) {
				const order = item.order;
				const size = item.size;
				const position = isIn
					? item.position.map((axis, i) => {
							return axis - 0.5 * size[i];
					  })
					: ["-", "-", "-"];

				const boxIsIn = item.isIn;
				const values = [order, ...position, ...size, boxIsIn];
				csvRows.push(values.join(","));
			}

			// Join rows with newlines
			return csvRows.join("\n");
		};

		const downloadCSV = (fileName) => {
			const headerCSV = `order,x,y,z,width,height,length,isIn`;
			const containerAsCSV = `container,-,-,-,${container[0]}, ${container[1]}, ${container[2]},-`;
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

		downloadCSV("solution.csv");
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
						onClick={getPreviousSolution}
						className="position-absolute d-flex"
						style={{ top: 435, left: 10, zIndex: 1 }}
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
								maxStepSize={Math.max(...container) / 2}
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
						onClick={getNextSolution}
						className="position-absolute d-flex"
						style={{ top: 435, right: 10, zIndex: 1 }}
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
										onClick={(e) => setSolutionId(null)}
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
											onClick={(e) =>
												handleSaveSolution(e)
											}
											text={"Save"}
										></EditButton>
									)}
								</Col>

								<Col className="d-flex justify-content-center">
									{isLoading ? (
										<CircularProgress />
									) : (
										<EditButton
											onClick={(e) =>
												improveSolutionInView()
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
						edit ? editExplanationText : viewExplanationText
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
