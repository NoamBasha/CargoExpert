export const BoxesTable = ({ boxes, setBoxId }) => {
	const handleClick = (index) => {
		console.log(index);
		setBoxId(index);
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
					{boxes.map((box, index) => {
						return (
							<tr
								key={index}
								onClick={() => handleClick(index)}
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
