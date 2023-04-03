import { useRef, useState, useEffect, useContext } from "react";
import { useHelper } from "@react-three/drei";
import { BoxHelper } from "three";
import { EditContext } from "./View.js";
import { useProject } from "../ProjectProvider.js";
import { BoxText } from "./BoxText.js";
import { useEdit } from "./EditProvider.js";

export const Box = ({ id, order, size, position, color, text }) => {
	const { changeBoxById, changeBoxIndices, solutionId } = useProject();
	const { edit } = useEdit();
	const [outlineColor, setOutlineColor] = useState("#303030");
	const [boxColor, setBoxColor] = useState(color);
	const eps = 0.0001;
	const [w, h, l] = size;
	const [x, y, z] = position;
	const mesh = useRef();
	useHelper(mesh, BoxHelper, outlineColor);

	useEffect(() => {
		setBoxColor(color);
	}, [solutionId]);

	const boxTexts = [
		{
			rotation: [0, Math.PI / 2, 0],
			position: [x + w / 2 + eps, y, z],
			text: text,
		},
		{
			rotation: [-Math.PI / 2, 0, Math.PI / 2],
			position: [x, y + h / 2 + eps, z],
			text: text,
		},
		{ rotation: [0, 0, 0], position: [x, y, z + l / 2 + eps], text: text },
		{
			rotation: [0, -Math.PI / 2, 0],
			position: [x - w / 2 - eps, y, z],
			text: text,
		},
		{
			rotation: [Math.PI / 2, 0, -Math.PI / 2],
			position: [x, y - h / 2 - eps, z],
			text: text,
		},
		{
			rotation: [0, -Math.PI, 0],
			position: [x, y, z - l / 2 - eps],
			text: text,
		},
	];

	const toggleColor = () => {
		console.log(boxColor, color);
		boxColor === color ? setBoxColor("#FF6C6C") : setBoxColor(color);
	};

	return (
		<>
			<mesh
				onClick={(e) => {
					if (edit) {
						e.stopPropagation();
						console.log(id, order, size, position, color, text);
						toggleColor();
						changeBoxIndices(id);
						changeBoxById(id, {
							id: id,
							order: order,
							position: position,
							text: text,
							color: color,
							size: size,
						});
					}
				}}
				ref={mesh}
				position={position}
			>
				<boxGeometry args={size} />
				<meshBasicMaterial
					color={edit ? boxColor : color}
					opacity={edit ? 0.9 : 1}
					transparent={true}
				/>
			</mesh>

			{boxTexts.map(({ rotation, position, text }, id) => {
				return (
					<BoxText
						key={id}
						rotation={rotation}
						position={position}
						text={text}
					/>
				);
			})}
		</>
	);
};
