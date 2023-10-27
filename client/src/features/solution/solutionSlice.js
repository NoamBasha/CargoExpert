import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import solutionService from "./solutionService.js";
import { logout } from "../auth/authSlice.js";

const initialState = {
	solutionId: null,
	name: "",
	data: null,
	boxes: [],
	previousBoxes: [],
	selectedBoxes: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const createSolution = createAsyncThunk(
	"solution/createSolution",
	async (solutionData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			const userId = thunkAPI.getState().auth.user._id;
			const response = await solutionService.createSolution(
				userId,
				solutionData,
				token
			);
			return response;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const updateSolution = createAsyncThunk(
	"solution/updateSolution",
	async ({ solutionId, solutionData }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await solutionService.updateSolution(
				{ solutionId, solutionData },
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const deleteSolution = createAsyncThunk(
	"solution/deleteSolution",
	async (solutionId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await solutionService.deleteSolution(solutionId, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const improveSolution = createAsyncThunk(
	"solution/improveSolution",
	async ({ solutionId }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await solutionService.improveSolution(solutionId, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
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
				(solution) => solution.id === solutionId
			);

			state.solutionId = solutionId;
			state.name = solution.name;

			const joinedBoxes = [];

			console.log(solution.boxes);
			console.log(projectBoxes);

			for (const projectBox of projectBoxes) {
				for (const solutionBox of solution.boxes) {
					if (projectBox._id === solutionBox.boxId) {
						// Merge the projectBox and solutionBox into a single object
						const joinedBox = { ...projectBox, ...solutionBox };
						joinedBoxes.push(joinedBox);
					}
				}
			}

			console.log(joinedBoxes);

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
					const newRotation = 0;
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
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(logout, () => {
			return initialState;
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
