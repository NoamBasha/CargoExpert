import { useRef, useState, useEffect } from "react";
import { useHelper } from "@react-three/drei";
import { BoxHelper } from "three";
import { BoxText } from "./BoxText.js";
import { useEdit } from "./EditProvider.js";
import {
	changeBoxById,
	changeBoxIndices,
	selectSolutionId,
	useSelectedBoxes,
	selectSolutionSelectedBoxes,
} from "../../../features/solution/solutionSlice.js";

import { useDispatch, useSelector } from "react-redux";

export const Box = ({
	id,
	order,
	size,
	position,
	color,
	type,
	isIn,
	rotation,
}) => {
	const dispatch = useDispatch();
	const solutionId = useSelector(selectSolutionId);
	const boxIndices = useSelector(selectSolutionSelectedBoxes);
	const { edit } = useEdit();
	const [boxColor, setBoxColor] = useState(color);
	const eps = 0.0001;

	/*
		const Rotation = {
			WHL: 0,
			LHW: 1,
			HLW: 2,
			LWH: 3,
			WLH: 4,
			HWL: 5,
		};
	*/
	//TODO: understand how the size and position comes.
	// let rotatedSize = [size[0], size[1], size[2]];

	let rotatedSize = [];
	if (rotation === 0) {
		rotatedSize = [size[0], size[1], size[2]];
	} else if (rotation === 1) {
		rotatedSize = [size[2], size[1], size[0]];
	} else if (rotation === 2) {
		rotatedSize = [size[1], size[2], size[0]];
	} else if (rotation === 3) {
		rotatedSize = [size[2], size[0], size[1]];
	} else if (rotation === 4) {
		rotatedSize = [size[0], size[2], size[1]];
	} else if (rotation === 5) {
		rotatedSize = [size[1], size[0], size[2]];
	}
	const [w, h, l] = rotatedSize;
	position = [position[0], position[1], position[2]];
	const [x, y, z] = position;

	const mesh = useRef();
	const outlineColor = "#303030";
	const boxEditColor = "#FF6C6C";
	useHelper(mesh, BoxHelper, outlineColor);

	useEffect(() => {
		setBoxColor(color);
	}, [solutionId, color]);

	useEffect(() => {
		if (!boxIndices.includes(id)) {
			setBoxColor(color);
		}
	}, [boxIndices, color, setBoxColor, id]);

	const boxTexts = [
		{
			rotation: [0, Math.PI / 2, 0],
			position: [x + w / 2 + eps, y, z],
			type: type,
		},
		{
			rotation: [-Math.PI / 2, 0, Math.PI / 2],
			position: [x, y + h / 2 + eps, z],
			type: type,
		},
		{ rotation: [0, 0, 0], position: [x, y, z + l / 2 + eps], type: type },
		{
			rotation: [0, -Math.PI / 2, 0],
			position: [x - w / 2 - eps, y, z],
			type: type,
		},
		{
			rotation: [Math.PI / 2, 0, -Math.PI / 2],
			position: [x, y - h / 2 - eps, z],
			type: type,
		},
		{
			rotation: [0, -Math.PI, 0],
			position: [x, y, z - l / 2 - eps],
			type: type,
		},
	];

	const toggleColor = () => {
		boxColor === color ? setBoxColor(boxEditColor) : setBoxColor(color);
	};

	return (
		<>
			<mesh
				onClick={async (e) => {
					if (edit) {
						e.stopPropagation();
						toggleColor();
						console.log(id);
						await dispatch(changeBoxIndices({ id }));
						await dispatch(
							changeBoxById(id, {
								_id: id,
								order: order,
								position: position,
								type: type,
								color: color,
								size: size,
								isIn: isIn,
								rotation: rotation,
							})
						);
					}
				}}
				ref={mesh}
				position={position}
			>
				<boxGeometry args={rotatedSize} />
				<meshBasicMaterial
					color={edit ? boxColor : color}
					opacity={edit ? 0.9 : 1}
					transparent={true}
				/>
			</mesh>

			{boxTexts.map(({ rotation, position, type }, id) => {
				return (
					<BoxText
						key={id}
						rotation={rotation}
						position={position}
						text={type}
					/>
				);
			})}
		</>
	);
};
