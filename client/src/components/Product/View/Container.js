import { Plane } from "./Plane.js";
export const Container = ({size}) => {
	const {width, height, length} = size;

	return (
		<>
			<Plane
				/* SmallBack */
				size={[width, height]}
				position={[width / 2, height / 2, 0]}
				rotation={[0, 0, 0]}
			/>
			<Plane
				/* LargeBack */
				size={[length, height]}
				position={[0, height / 2, length / 2]}
				rotation={[0, Math.PI / 2, 0]}
			/>
			<Plane
				/* LargeFront */
				size={[length, height]}
				position={[width, height / 2, length / 2]}
				rotation={[0, -Math.PI / 2, 0]}
			/>
			{/* SmallFront */}
			{/*
			<Plane
				size={[w, h]}
				position={[w / 2, h / 2, l]}
				rotation={[0, Math.PI, 0]}
			/>
            */}
			<Plane
				/* Bottom */
				size={[length, width]}
				position={[width / 2, 0, length / 2]}
				rotation={[-Math.PI / 2, 0, Math.PI / 2]}
			/>
			<Plane
				/* Top */
				size={[length, width]}
				position={[width / 2, height, length / 2]}
				rotation={[Math.PI / 2, 0, Math.PI / 2]}
			/>
		</>
	);
};
