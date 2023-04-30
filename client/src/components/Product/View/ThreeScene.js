import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Box } from "./Box.js";
import { Container } from "./Container.js";
import { useContext } from "react";
import { EditContext } from "./View.js";
import { useProject } from "../ProjectProvider.js";
import { useEdit } from "./EditProvider.js";

export const ThreeScene = ({ container, children }) => {
	const { edit } = useEdit();
	const { inBoxes } = useProject();

	const camera_position = container.map((n) => n * 2);
	const axes_length = Math.max(...container) * 1.5;

	return (
		<div
			className="w-100 d-flex flex-row justify-content-center align-items-center"
			style={{ height: "75vh" }}
		>
			{children}
			<Canvas camera={{ fov: 75, position: camera_position }}>
				<Container size={container} />
				{inBoxes.map(
					({ id, order, size, position, color, text, isIn }) => {
						return (
							<Box
								key={id}
								id={id}
								order={order}
								size={size}
								position={position}
								color={color}
								text={text}
								isIn={isIn}
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
