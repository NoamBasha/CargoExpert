import { DataGrid } from "@mui/x-data-grid";

export const BoxesViewTable = ({ boxes }) => {
	const columns = [
		{ field: "order", headerName: "Order", width: 10 },
		{ field: "width", headerName: "W", width: 10 },
		{ field: "height", headerName: "H", width: 10 },
		{ field: "length", headerName: "L", width: 10 },
		{ field: "type", headerName: "Type", width: 100 },
	];

	const rows = boxes.map((box) => {
		console.log(box);
		return {
			id: box.id,
			order: box.order,
			width: box.size[0],
			height: box.size[1],
			length: box.size[2],
			type: box.text,
		};
	});

	return (
		<div style={{ height: "35vh", width: "400px" }}>
			<DataGrid
				sx={{}}
				rows={rows}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={10}
				checkboxSelection
				disableRowSelectionOnClick
			/>
		</div>
	);
};
