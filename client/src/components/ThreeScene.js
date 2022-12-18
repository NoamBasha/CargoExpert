import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import { Plane } from "@react-three/drei";
import { useHelper } from "@react-three/drei";
import { BoxHelper } from "three";

import { Text } from "@react-three/drei";

const eps = 0.0001;

const Plane = ({ args, position, rotation, color }) => {
	return (
		<mesh
			position={position}
			rotation={rotation}
		>
			<planeBufferGeometry
				attach="geometry"
				args={args}
			/>
			<meshBasicMaterial
				attach="material"
				color="#FFFFFF"
			/>
		</mesh>
	);
};

const Box = ({ args, position, color }) => {
	const mesh = useRef();
	useHelper(mesh, BoxHelper, "#272740");
	return (
		<>
			{/* mesh - holds geomtry and material to represent a shape */}
			<mesh
				ref={mesh}
				position={position}
			>
				{/* args={[height, width, length]}
                Note that every time the args are changed, the object must be re-constructed!*/}
				<boxGeometry args={args} />
				<meshBasicMaterial
					color={color}
					opacity={1}
					wireframe={false}
				/>
			</mesh>
			<Text
				scale={[5, 5, 5]}
				rotation={[0, Math.PI / 2, 0]}
				position={[
					position[0] + args[0] / 2 + eps,
					position[1],
					position[2],
				]}
				color="black"
			>
				Box
			</Text>
			<Text
				scale={[5, 5, 5]}
				rotation={[-Math.PI / 2, 0, Math.PI / 2]}
				position={[
					position[0],
					position[1] + args[1] / 2 + eps,
					position[2],
				]}
				color="black"
			>
				Box
			</Text>
			<Text
				scale={[5, 5, 5]}
				rotation={[0, 0, 0]}
				position={[
					position[0],
					position[1],
					position[2] + args[2] / 2 + eps,
				]}
				color="black"
			>
				Box
			</Text>
			<Text
				scale={[5, 5, 5]}
				rotation={[0, -Math.PI / 2, 0]}
				position={[
					position[0] - args[0] / 2 - eps,
					position[1],
					position[2],
				]}
				color="black"
			>
				Box
			</Text>
			<Text
				scale={[5, 5, 5]}
				rotation={[+Math.PI / 2, 0, -Math.PI / 2]}
				position={[
					position[0],
					position[1] - args[1] / 2 - eps,
					position[2],
				]}
				color="black"
			>
				Box
			</Text>
			<Text
				scale={[5, 5, 5]}
				rotation={[0, -Math.PI, 0]}
				position={[
					position[0],
					position[1],
					position[2] - args[2] / 2 - eps,
				]}
				color="black"
			>
				Box
			</Text>
		</>
	);
};

const Container = () => {
	return (
		<>
			<Plane
				/* SmallBack */
				args={[4, 4]}
				position={[2, 2, 0]}
				rotation={[0, 0, 0]}
				color="green"
			/>
			<Plane
				/* LargeBack */
				args={[10, 4]}
				position={[0, 2, 5]}
				rotation={[0, Math.PI / 2, 0]}
				color="green"
			/>
			<Plane
				/* LargeFront */
				args={[10, 4]}
				position={[4, 2, 5]}
				rotation={[0, -Math.PI / 2, 0]}
				color="green"
			/>
			{/* SmallFront */}
			{/*
			<Plane
				args={[4, 4]}
				position={[2, 2, 10]}
				rotation={[0, Math.PI, 0]}
				color="green"
			/>
			*/}
			<Plane
				/* Top */
				args={[10, 4]}
				position={[2, 0, 5]}
				rotation={[-Math.PI / 2, 0, Math.PI / 2]}
				color="green"
			/>
			<Plane
				/* Bottom */
				args={[10, 4]}
				position={[2, 4, 5]}
				rotation={[Math.PI / 2, 0, Math.PI / 2]}
				color="green"
			/>
		</>
	);
};

const Boxes = () => {
	return (
		<>
			<Box
				args={[2, 2, 5]}
				position={[1, 1, 2.5]}
				color="#00BCFF"
			/>
			<Box
				args={[2, 2, 5]}
				position={[3, 1, 2.5]}
				color="#00BCFF"
			/>{" "}
			*
			<Box
				args={[2, 2, 5]}
				position={[1, 3, 2.5]}
				color="#00BCFF"
			/>
			<Box
				args={[2, 2, 5]}
				position={[1, 1, 7.5]}
				color="#00BCFF"
			/>
			<Box
				args={[2, 2, 5]}
				position={[1, 3, 7.5]}
				color="#00BCFF"
			/>
			<Box
				args={[2, 2, 5]}
				position={[3, 1, 7.5]}
				color="#00BCFF"
			/>
			<Box
				args={[1, 1, 2.5]}
				position={[2.5, 2.5, 1.25]}
				color="#00ffbc"
			/>
			<Box
				args={[1, 1, 2.5]}
				position={[2.5, 2.5, 3.75]}
				color="#00ffbc"
			/>
			<Box
				args={[1, 1, 2.5]}
				position={[2.5, 2.5, 6.25]}
				color="#00ffbc"
			/>
			<Box
				args={[1, 1, 2.5]}
				position={[2.5, 2.5, 8.75]}
				color="#00ffbc"
			/>
		</>
	);
};

export const ThreeScene = () => {
	return (
		/*
        Canvas - sets up a scene and a camera + renders the scene every frame
        fits the parent node - (width and height)
        */
		<Canvas>
			{/* ambientLight - light that is all over the scene */}
			<ambientLight intensity={0.1} />
			{/* directionalLight - light that is coming from a certain direction */}
			<directionalLight position={[10, 10, 10]} />
			<Container />
			<Boxes />
			{/* minPolarAngle={0} maxPolarAngle={Math.PI / 2.1}*/}

			<OrbitControls />
			<axesHelper args={[15]} />
		</Canvas>
	);
};
