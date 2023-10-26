import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Box } from "./Box.js";
import { Container } from "./Container.js";
import { useProject } from "../ProjectProvider.js";
import { useEdit } from "./EditProvider.js";

import { useSelector } from "react-redux";
import { selectSolutionBoxes } from "../../../features/solution/solutionSlice.js";

export const ThreeScene = ({ container, children }) => {
	const { edit } = useEdit();

	const boxes = useSelector(selectSolutionBoxes);
	const inBoxes = boxes.filter((box) => box.isIn === true);

	const camera_position = container.map((n) => n * 2);
	const axes_length = Math.max(...container) * 1.5;

	return (
		<div className="h-100 w-100 d-flex flex-row justify-content-center align-items-center">
			{children}
			<Canvas camera={{ fov: 75, position: camera_position }}>
				<Container size={container} />
				{inBoxes.map(
					({
						_id,
						order,
						size,
						position,
						color,
						type,
						isIn,
						rotation,
					}) => {
						return (
							<Box
								key={_id}
								id={_id}
								order={order}
								size={Object.values(size)}
								color={color}
								type={type}
								isIn={isIn}
								position={Object.values(position)}
								rotation={rotation}
							/>
						);
					}
				)}
				<OrbitControls />
				{edit ? <axesHelper args={[axes_length]} /> : null}
			</Canvas>
		</div>
	);
};
