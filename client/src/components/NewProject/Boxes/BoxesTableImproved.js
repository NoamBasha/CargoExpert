import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

export const BoxesTableImproved = ({
	boxes,
	selectedOrders,
	setSelecetedOrders,
}) => {
	console.log(selectedOrders);

	const columns = [
		{ field: "id", headerName: "Order", width: 100 },
		{ field: "width", headerName: "Width", width: 100 },
		{ field: "height", headerName: "Height", width: 100 },
		{ field: "length", headerName: "Length", width: 100 },
		{ field: "type", headerName: "Type", width: 100 },
	];

	const rows = boxes.map((box) => {
		return {
			id: box.order,
			width: box.width,
			height: box.height,
			length: box.length,
			type: box.type,
		};
	});

	return (
		<div style={{ height: 500, width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={10}
				checkboxSelection
				disableRowSelectionOnClick
				onRowSelectionModelChange={(newRow) => {
					setSelecetedOrders(newRow);
				}}
				rowSelectionModel={selectedOrders}
			/>
		</div>
	);
};
