import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export const Container = () => {
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
			{/* mesh - holds geomtry and material to represent a shape */}
			<mesh
				position={[0.5, 0.5, 0.5]}
				rotation={[0, 0, 0]}
			>
				{/* args={[height, width, length]}
                Note that every time the args are changed, the object must be re-constructed!*/}
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial color="blue" />
			</mesh>
			<mesh
				position={[0.5, 0.5, 1.5]}
				rotation={[0, 0, 0]}
			>
				{/* args={[height, width, length]}
                Note that every time the args are changed, the object must be re-constructed!*/}
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial />
			</mesh>
			<mesh
				position={[4, 4, 4]}
				rotation={[0, 0, 0]}
			>
				{/* args={[height, width, length]}
                Note that every time the args are changed, the object must be re-constructed!*/}
				<boxGeometry args={[1, 1, 1]} />
				<meshPhongMaterial
					color="#ffffff"
					opacity={0.2}
					transparent
				/>
			</mesh>
			{/* minPolarAngle={0} maxPolarAngle={Math.PI / 2.1}*/}
			<OrbitControls />
			<axesHelper args={[5]} />
		</Canvas>
	);
};
