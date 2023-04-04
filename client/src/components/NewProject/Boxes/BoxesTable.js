import { DataGrid } from "@mui/x-data-grid";
import "./BoxesTable.css";

export const BoxesTable = ({ boxes, selectedIds, setSelecetedIds }) => {
	console.log(selectedIds);

	const columns = [
		{ field: "order", headerName: "Order", width: 100 },
		{ field: "width", headerName: "Width", width: 100 },
		{ field: "height", headerName: "Height", width: 100 },
		{ field: "length", headerName: "Length", width: 100 },
		{ field: "type", headerName: "Type", width: 100 },
	];

	const rows = boxes.map((box) => {
		return {
			id: box.id,
			order: box.order,
			width: box.width,
			height: box.height,
			length: box.length,
			type: box.type,
		};
	});

	return (
		<div className="boxes-table">
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={10}
				checkboxSelection
				disableRowSelectionOnClick
				onRowSelectionModelChange={(rows) => {
					setSelecetedIds(rows);
				}}
				rowSelectionModel={selectedIds}
			/>
		</div>
	);
};
