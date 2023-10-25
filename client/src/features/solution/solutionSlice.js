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

export const projectSlice = createSlice({
	name: "solution",
	initialState,
	reducers: {
		setSolutionById: (state, action) => {
			const solutionId = action.payload;
			const solutions = state.project.solutions;
			const solution = solutions.find(
				(solution) => solution.id === solutionId
			);

			state.solutionId = solutionId;
			state.name = solution.name;

			//TODO! unite project and solutions boxes!
			const projectBoxes = state.project.boxes;
			state.boxes = solution.boxes;

			state.previousBoxes = solution.boxes;
			state.data = project.data;
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
				if (state.selectedBoxes.includes(box.id)) {
					const [x, y, z] = box.position;
					return { ...box, position: [x + a, y + b, z + c] };
				} else {
					return box;
				}
			});
		},
		rotateBox: (state, action) => {
			const axis = action.payload;
			state.boxes = state.boxes.map((box) => {
				if (state.selectedBoxes.includes(box.id)) {
					const [w, h, l] = box.size;
					if (axis === "x") {
						return { ...box, size: [w, l, h] };
					} else if (axis === "y") {
						return { ...box, size: [l, h, w] };
					} else if (axis === "z") {
						return { ...box, size: [h, w, l] };
					}
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
				if (box.id === id) {
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
