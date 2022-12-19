import { ThreeScene } from "./ThreeScene.js";
import { useState } from "react";

const AxisButton = ({ axis, direction, edit, setBoxPosition }) => {
	return (
		<>
			{edit ? (
				<button
					onClick={() => setBoxPosition(axis, direction)}
					disabled={!edit}
				>
					{axis} {direction}
				</button>
			) : null}
		</>
	);
};

const EditButton = ({ setEdit }) => {
	return <button onClick={() => setEdit()}>Edit</button>;
};

const ViewButton = ({ setEdit }) => {
	return <button onClick={() => setEdit()}>View</button>;
};

export const View = () => {
	const [edit, setEdit] = useState(false);
	return (
		<>
			<AxisButton
				axis="x"
				direction="-"
				edit={edit}
			/>
			<AxisButton
				axis="x"
				direction="+"
				edit={edit}
			/>
			<br />
			<AxisButton
				axis="y"
				direction="-"
				edit={edit}
			/>
			<AxisButton
				axis="y"
				direction="+"
				edit={edit}
			/>
			<br />
			<AxisButton
				axis="z"
				direction="-"
				edit={edit}
			/>
			<AxisButton
				axis="z"
				direction="+"
				edit={edit}
			/>
			<ThreeScene edit={edit}></ThreeScene>
			<EditButton setEdit={(e) => setEdit(true)} />
			<ViewButton setEdit={(e) => setEdit(false)} />
		</>
	);
};
