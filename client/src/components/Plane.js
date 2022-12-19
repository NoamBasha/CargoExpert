export const Plane = ({ size, position, rotation }) => {
	return (
		<mesh
			position={position}
			rotation={rotation}
		>
			<planeBufferGeometry args={size} />
			<meshBasicMaterial />
			{/* <meshNormalMaterial /> */}
		</mesh>
	);
};
