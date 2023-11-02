import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import solutionService from "./solutionService.js";
import { logout } from "../auth/authSlice.js";
import { getRotatedSizeBoxes } from "../../utils.js";

const joinArrays = (firstArray, secondArray, firstField, secondField) => {
	const joinedArrays = [];
	for (const firstItem of firstArray) {
		for (const secondItem of secondArray) {
			if (firstItem[firstField] === secondItem[secondField]) {
				const joinedItem = { ...firstItem, ...secondItem };
				joinedArrays.push(joinedItem);
			}
		}
	}
	return joinedArrays;
};

const initialState = {
	solutionId: null,
	name: "",
	data: null,
	boxes: [],
	previousBoxes: [],
	selectedBoxes: [],
};

export const createSolution = createAsyncThunk(
	"solution/createSolution",
	async (solutionId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			const projectId = thunkAPI.getState().project.projectId;
			const solutions = thunkAPI.getState().project.solutions;
			const solutionData = solutions.find(
				(solution) => solution._id === solutionId
			);
			const response = await solutionService.createSolution(
				projectId,
				solutionData,
				token
			);
			return response;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const duplicateSolution = createAsyncThunk(
	"solution/duplicateSolution",
	async (solutionId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			const projectId = thunkAPI.getState().project.projectId;
			const solutions = thunkAPI.getState().project.solutions;
			let solutionData = solutions.find(
				(solution) => solution._id === solutionId
			);

			solutionData = {
				...solutionData,
				name: solutionData.name + " duplicated",
			};

			const response = await solutionService.createSolution(
				projectId,
				solutionData,
				token
			);
			return response;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const updateSolution = createAsyncThunk(
	"solution/updateSolution",
	async ({ solutionId, newSolution }, thunkAPI) => {
		try {
			const projectId = thunkAPI.getState().project.projectId;
			const token = thunkAPI.getState().auth.user.token;
			const projectBoxes = thunkAPI.getState().project.boxes;

			const joinedBoxes = joinArrays(
				projectBoxes,
				newSolution.boxes,
				"_id",
				"boxId"
			);
			const rotatedJoinedBoxes = getRotatedSizeBoxes(joinedBoxes);
			newSolution.boxes = rotatedJoinedBoxes;

			return await solutionService.updateSolution(
				{ solutionId, newSolution, projectId },
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const deleteSolution = createAsyncThunk(
	"solution/deleteSolution",
	async ({ solutionId }, thunkAPI) => {
		try {
			const projectId = thunkAPI.getState().project.projectId;
			const token = thunkAPI.getState().auth.user.token;
			return await solutionService.deleteSolution(
				{ solutionId, projectId },
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const improveSolution = createAsyncThunk(
	"solution/improveSolution",
	async ({ solutionId }, thunkAPI) => {
		try {
			const projectId = thunkAPI.getState().project.projectId;
			const container = thunkAPI.getState().project.container;
			const boxes = thunkAPI.getState().solution.boxes;
			const token = thunkAPI.getState().auth.user.token;
			return await solutionService.improveSolution(
				{ solutionId, projectId, boxes, container },
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const solutionSlice = createSlice({
	name: "solution",
	initialState,
	reducers: {
		setSolutionById: (state, action) => {
			const { solutionId, solutions, projectBoxes } = action.payload;

			const solution = solutions.find(
				(solution) => solution._id === solutionId
			);

			const joinedBoxes = joinArrays(
				projectBoxes,
				solution.boxes,
				"_id",
				"boxId"
			);

			/*
				projectBox: 
				order,
				type,
				color,
				size,
				_id (of the projectBox)

				solutionBox:
				boxId,
				isIn,
				position,
				rotation,
				_id (of the solutionBox)
			*/

			state.solutionId = solutionId;
			state.name = solution.name;
			state.boxes = joinedBoxes;
			state.previousBoxes = joinedBoxes;
			state.data = solution.data;
		},
		setBoxes: (state, action) => {
			state.boxes = action.payload;
		},
		setPreviousBoxes: (state, action) => {
			state.previousBoxes = action.payload;
		},
		setSelectedBoxes: (state, action) => {
			state.selectedBoxes = action.payload;
		},
		moveBox: (state, action) => {
			const [a, b, c] = action.payload;
			state.boxes = state.boxes.map((box) => {
				if (state.selectedBoxes.includes(box._id)) {
					return {
						...box,
						position: {
							...box.position,
							x: box.position.x + a,
							y: box.position.y + b,
							z: box.position.z + c,
						},
					};
				} else {
					return box;
				}
			});
		},
		rotateBox: (state, action) => {
			const axis = action.payload;
			state.boxes = state.boxes.map((box) => {
				if (state.selectedBoxes.includes(box._id)) {
					let newRotation = 0;
					if (axis === "x") {
						if (box.rotation === 0) newRotation = 4;
						if (box.rotation === 1) newRotation = 3;
						if (box.rotation === 2) newRotation = 5;
						if (box.rotation === 3) newRotation = 1;
						if (box.rotation === 4) newRotation = 0;
						if (box.rotation === 5) newRotation = 2;
					} else if (axis === "y") {
						if (box.rotation === 0) newRotation = 1;
						if (box.rotation === 1) newRotation = 0;
						if (box.rotation === 2) newRotation = 4;
						if (box.rotation === 3) newRotation = 5;
						if (box.rotation === 4) newRotation = 2;
						if (box.rotation === 5) newRotation = 3;
					} else if (axis === "z") {
						if (box.rotation === 0) newRotation = 5;
						if (box.rotation === 1) newRotation = 2;
						if (box.rotation === 2) newRotation = 1;
						if (box.rotation === 3) newRotation = 4;
						if (box.rotation === 4) newRotation = 3;
						if (box.rotation === 5) newRotation = 0;
					}
					return { ...box, rotation: newRotation };
				} else {
					return box;
				}
			});
		},
		resetBoxes: (state) => {
			state.selectedBoxes = [];
			state.boxes = state.previousBoxes;
		},
		changeBoxById: (state, action) => {
			const { id, newBox } = action.payload;
			state.boxes = state.boxes.map((box) => {
				if (box._id === id) {
					return newBox;
				} else {
					return box;
				}
			});
		},
		changeBoxIndices: (state, action) => {
			const { id } = action.payload;
			if (state.selectedBoxes.includes(id)) {
				state.selectedBoxes = state.selectedBoxes.filter(
					(inId) => inId !== id
				);
			} else {
				state.selectedBoxes = [...state.selectedBoxes, id];
			}
		},
		selectBox: (state, action) => {
			const id = action.payload;
			if (!state.selectedBoxes.includes(id)) {
				state.selectedBoxes.push(id);
			}
		},
		deselectBox: (state, action) => {
			const id = action.payload;
			state.selectedBoxes = state.selectedBoxes.filter(
				(selectedId) => selectedId !== id
			);
		},
		deselectBoxes: (state) => {
			state.selectedBoxes = [];
		},
		removeBoxes: (state) => {
			state.boxes = state.boxes.map((box) => ({
				...box,
				isIn: state.selectedBoxes.includes(box._id) ? false : box.isIn,
			}));
		},
		toggleIsIn: (state, action) => {
			const { id } = action.payload;
			state.boxes = state.boxes.map((box) => {
				if (box._id === id) {
					return { ...box, isIn: box.isIn === true ? false : true };
				} else {
					return box;
				}
			});
		},
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(logout, () => {
				return initialState;
			})
			.addCase(improveSolution.fulfilled, (state, action) => {
				const solutionId = state.solutionId;
				const solutions = action.payload.project.solutions;
				const projectBoxes = action.payload.project.boxes;

				const solution = solutions.find(
					(solution) => solution._id === solutionId
				);

				const joinedBoxes = joinArrays(
					projectBoxes,
					solution.boxes,
					"_id",
					"boxId"
				);

				state.solutionId = solutionId;
				state.name = solution.name;
				state.boxes = joinedBoxes;
				state.previousBoxes = joinedBoxes;
				state.data = solution.data;
			});
	},
});

export const {
	setSolutionById,
	setBoxes,
	setPreviousBoxes,
	setSelectedBoxes,
	moveBox,
	rotateBox,
	resetBoxes,
	changeBoxById,
	selectBox,
	deselectBox,
	deselectBoxes,
	reset,
	changeBoxIndices,
	removeBoxes,
	toggleIsIn,
} = solutionSlice.actions;

export default solutionSlice.reducer;

export const selectSolutionId = (state) => state.solution.solutionId;
export const selectSolutionName = (state) => state.solution.name;
export const selectSolutionData = (state) => state.solution.data;
export const selectSolutionBoxes = (state) => state.solution.boxes;
export const selectSolutionPreviousBoxes = (state) =>
	state.solution.previousBoxes;
export const selectSolutionSelectedBoxes = (state) =>
	state.solution.selectedBoxes;
