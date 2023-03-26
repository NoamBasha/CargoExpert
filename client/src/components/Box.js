import { useRef, useState, useContext } from "react";
import { useHelper } from "@react-three/drei";
import { BoxHelper } from "three";
import { EditContext } from "./View.js";
import { useProject } from "./ProjectProvider.js";
import { BoxText } from "./BoxText.js";

export const Box = ({ id, size, position, color, text }) => {
	const { changeBoxById, changeBoxIndices } = useProject();
	const { edit } = useContext(EditContext);
	const [outlineColor, setOutlineColor] = useState("#303030");
	const [boxColor, setBoxColor] = useState(color);
	const eps = 0.0001;
	const [w, h, l] = size;
	const [x, y, z] = position;
	const mesh = useRef();
	useHelper(mesh, BoxHelper, outlineColor);

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

	return (
		<>
			<mesh
				onClick={(e) => {
					if (edit) {
						e.stopPropagation();
						boxColor === color
							? setBoxColor("#FF6C6C")
							: setBoxColor(color);
						changeBoxIndices(id);
						changeBoxById(id, {
							size: size,
							position: position,
							color: color,
							text: text,
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

			{boxTexts.map(({ rotation, position, text }, index) => {
				return (
					<BoxText
						key={index}
						rotation={rotation}
						position={position}
						text={text}
					/>
				);
			})}
		</>
	);
};
