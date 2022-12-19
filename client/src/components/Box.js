import { useRef, useState } from "react";
import { useHelper } from "@react-three/drei";
import { BoxHelper } from "three";
import { Text } from "@react-three/drei";

const BoxText = ({ position, rotation, text }) => {
	const textColor = "black";
	const textScale = [3, 3, 3];
	return (
		<Text
			scale={textScale}
			rotation={rotation}
			position={position}
			color={textColor}
		>
			{text}
		</Text>
	);
};

export const Box = ({ id, size, position, color, text, edit, setBoxes }) => {
	const [outlineColor, setOutlineColor] = useState("#303030");
	const [boxColor, setBoxColor] = useState(color);
	const eps = 0.0001;
	const [w, h, l] = size;
	const [x, y, z] = position;
	const mesh = useRef();
	useHelper(mesh, BoxHelper, outlineColor);
	return (
		<>
			{/* mesh - holds geomtry and material to represent a shape */}
			<mesh
				onClick={(e) => {
					if (edit) {
						e.stopPropagation();
						boxColor == color
							? setBoxColor("#FF6C6C")
							: setBoxColor(color);
						setBoxes(id, {
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
				{/* args={[height, width, length]}
                Note that every time the args are changed, the object must be re-constructed!*/}
				<boxGeometry args={size} />
				<meshBasicMaterial
					color={boxColor}
					//TODO: When moving we might want to change the opacity
					opacity={1}
					transparent={true}
				/>
			</mesh>
			<BoxText
				rotation={[0, Math.PI / 2, 0]}
				position={[x + w / 2 + eps, y, z]}
				text={id}
			></BoxText>
			<BoxText
				rotation={[-Math.PI / 2, 0, Math.PI / 2]}
				position={[x, y + h / 2 + eps, z]}
				text={text}
			></BoxText>
			<BoxText
				rotation={[0, 0, 0]}
				position={[x, y, z + l / 2 + eps]}
				text={text}
			></BoxText>
			<BoxText
				rotation={[0, -Math.PI / 2, 0]}
				position={[x - w / 2 - eps, y, z]}
				text={text}
			></BoxText>
			<BoxText
				rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				position={[x, y - h / 2 - eps, z]}
				text={text}
			></BoxText>
			<BoxText
				rotation={[0, -Math.PI, 0]}
				position={[x, y, z - l / 2 - eps]}
				text={text}
			></BoxText>
		</>
	);
};
