import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Box } from "./Box.js";
import { Container } from "./Container.js";
import { useContext } from "react";
import { EditContext } from "./View.js";
import { useProject } from "../ProjectProvider.js";

export const ThreeScene = ({ container }) => {
	const { edit } = useContext(EditContext);
	const { boxes } = useProject();
	console.log(boxes);

	const camera_position = container.map((n) => n * 2);
	const axes_length = Math.max(...container) * 1.5;

	return (
		<div
			style={{
				display: "flex",
				position: "relative",
				width: "auto",
				height: 800,
			}}
		>
			<Canvas camera={{ fov: 75, position: camera_position }}>
				<Container size={container} />
				{boxes.map(({ order, size, position, color, text }) => {
					return (
						<Box
							key={order}
							order={order}
							size={size}
							position={position}
							color={color}
							text={text}
						/>
					);
				})}
				<OrbitControls />
				{edit ? <axesHelper args={[axes_length]} /> : null}
			</Canvas>
		</div>
	);
};
