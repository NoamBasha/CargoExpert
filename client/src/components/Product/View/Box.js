import { useRef, useState, useEffect } from "react";
import { useHelper } from "@react-three/drei";
import { BoxHelper } from "three";
import { BoxText } from "./BoxText.js";
import { useEdit } from "./EditProvider.js";
import {
	changeBoxById,
	changeBoxIndices,
	selectSolutionId,
	selectSolutionSelectedBoxes,
} from "../../../features/solution/solutionSlice.js";

import { useDispatch, useSelector } from "react-redux";

import { getBoxRotatedSize } from "../../../utils.js"


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

	let rotatedSize = getBoxRotatedSize({size, rotation});

	const {width, height, length} = rotatedSize;
	const {x, y, z} = position;

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
			position: [x + width / 2 + eps, y, z],
			type: type,
		},
		{
			rotation: [-Math.PI / 2, 0, Math.PI / 2],
			position: [x, y + height / 2 + eps, z],
			type: type,
		},
		{ rotation: [0, 0, 0], position: [x, y, z + length / 2 + eps], type: type },
		{
			rotation: [0, -Math.PI / 2, 0],
			position: [x - width / 2 - eps, y, z],
			type: type,
		},
		{
			rotation: [Math.PI / 2, 0, -Math.PI / 2],
			position: [x, y - height / 2 - eps, z],
			type: type,
		},
		{
			rotation: [0, -Math.PI, 0],
			position: [x, y, z - length / 2 - eps],
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
				position={Object.values(position)}
			>
				<boxGeometry args={Object.values(rotatedSize)} />
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
