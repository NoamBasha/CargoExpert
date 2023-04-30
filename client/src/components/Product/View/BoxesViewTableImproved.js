import { DataGrid } from "@mui/x-data-grid";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Paper,
	Typography,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Button, Snackbar } from "@mui/material";

export const BoxesViewTableImproved = ({ boxes, toggleIsIn, isIn }) => {
	const rows = boxes.map((box) => {
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
		<div>
			<h6>
				{isIn ? "Boxes in the solution" : "Boxes out of the solution"}
			</h6>
			<TableContainer
				component={Paper}
				sx={{ height: "35vh", width: "400px" }}
			>
				{/* <Typography>
					<caption
						style={{ display: "inline-block", margin: "0.5em 0" }}
					>
						{isIn
							? "Boxes in the solution"
							: "Boxes out of the solution"}
					</caption>
				</Typography> */}
				<Table
					aria-label="projects table"
					size="small"
					stickyHeader
				>
					<TableHead>
						<TableRow>
							<TableCell>Order</TableCell>
							<TableCell>W</TableCell>
							<TableCell>H</TableCell>
							<TableCell>L</TableCell>
							<TableCell>Type</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => {
							return (
								<TableRow
									key={row.id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell>{row.order}</TableCell>
									<TableCell>{row.width}</TableCell>
									<TableCell>{row.height}</TableCell>
									<TableCell>{row.length}</TableCell>
									<TableCell>{row.type}</TableCell>
									<TableCell>
										<Button
											onClick={() => {
												console.log(row.id);
												toggleIsIn(row.id);
											}}
										>
											{isIn ? (
												<RemoveOutlinedIcon size="small" />
											) : (
												<AddOutlinedIcon size="small" />
											)}
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};
