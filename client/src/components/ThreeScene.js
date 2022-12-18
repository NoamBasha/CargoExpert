import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Box } from "./Box.js";
import { Container } from "./Container.js";

import raw from "./boxes.txt";

const Boxes = () => {
	return (
		<>
			<Box
				size={[2, 2, 5]}
				position={[1, 1, 2.5]}
				color="#00BCFF"
				text="Box1"
			/>
			<Box
				size={[2, 2, 5]}
				position={[3, 1, 2.5]}
				color="#00BCFF"
				text="Box2"
			/>
			<Box
				size={[2, 2, 5]}
				position={[1, 3, 2.5]}
				color="#00BCFF"
				text="Box3"
			/>
			<Box
				size={[2, 2, 5]}
				position={[1, 1, 7.5]}
				color="#00BCFF"
				text="Box4"
			/>
			<Box
				size={[2, 2, 5]}
				position={[1, 3, 7.5]}
				color="#00BCFF"
				text="Box5"
			/>
			<Box
				size={[2, 2, 5]}
				position={[3, 1, 7.5]}
				color="#00BCFF"
				text="Box6"
			/>
			<Box
				size={[1, 1, 2.5]}
				position={[2.5, 2.5, 1.25]}
				color="#00ffbc"
				text="Box7"
			/>
			<Box
				size={[1, 1, 2.5]}
				position={[2.5, 2.5, 3.75]}
				color="#00ffbc"
				text="Box8"
			/>
			<Box
				size={[1, 1, 2.5]}
				position={[2.5, 2.5, 6.25]}
				color="#00ffbc"
				text="Box9"
			/>
			<Box
				size={[1, 1, 2.5]}
				position={[2.5, 2.5, 8.75]}
				color="#00ffbc"
				text="Box10"
			/>
		</>
	);
};

export const ThreeScene = () => {
	/*
	let raw_text;
	await fetch(raw)
		.then((r) => r.text())
		.then((text) => {
			raw_text = text;
		});
	console.log(raw_text);
	*/

	return (
		/*
        Canvas - sets up a scene and a camera + renders the scene every frame
        fits the parent node - (width and height)
        */
		<Canvas camera={{ fov: 75, position: [10, 10, 15] }}>
			{/* ambientLight - light that is all over the scene */}
			<ambientLight intensity={0.1} />
			{/* directionalLight - light that is coming from a certain direction */}
			<directionalLight position={[10, 10, 10]} />
			<Container size={[4, 4, 10]} />
			<Boxes />
			{/* minPolarAngle={0} maxPolarAngle={Math.PI / 2.1}*/}
			<OrbitControls />
			<axesHelper args={[15]} />
		</Canvas>
	);
};
