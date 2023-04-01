export const BoxesTable = ({ boxes, setCurrentBox }) => {
	const handleClick = (box) => {
		setCurrentBox(box);
	};

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>order</th>
						<th>width</th>
						<th>height</th>
						<th>length</th>
						<th>type</th>
					</tr>
				</thead>
				<tbody>
					{boxes.map((box) => {
						return (
							<tr
								key={box.order}
								onClick={() => handleClick(box)}
							>
								<td>{box.order}</td>
								<td>{box.width}</td>
								<td>{box.height}</td>
								<td>{box.length}</td>
								<td>{box.type}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
