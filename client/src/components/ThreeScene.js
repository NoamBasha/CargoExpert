import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Box } from "./Box.js";
import { Container } from "./Container.js";
import { useContext } from "react";
import { EditContext } from "./View.js";
import { useProject } from "./ProjectProvider.js";

export const ThreeScene = ({ container }) => {
	const { edit } = useContext(EditContext);
	const { boxes } = useProject();

	const camera_position = container.map((n) => n * 2);

	/*
		Canvas - sets up a scene and a camera + renders the scene every frame.
        fits the parent node - (width and height)
		ambientLight - light that is all over the scene
		<ambientLight intensity={0.1} />
		directionalLight - light that is coming from a certain direction
		<directionalLight position={[10, 10, 10]} />
		minPolarAngle=0{} maxPolarAngle={Math.PI / 2.1}
	*/
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
				{boxes.map(({ size, position, color, text }, index) => {
					return (
						<Box
							key={index}
							id={index}
							size={size}
							position={position}
							color={color}
							text={text}
						/>
					);
				})}
				<OrbitControls />
				{edit ? <axesHelper args={[15]} /> : null}
			</Canvas>
		</div>
	);
};
