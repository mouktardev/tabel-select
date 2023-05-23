import { ColumnDef, Row } from "@tanstack/react-table";

import IndeterminateCheckbox from "./IndeterminateCheckbox";

export default function CreateSelectColumn<T>(): ColumnDef<T> {
	let lastSelectedId = "";

	return {
		id: "select",
		header: ({ table }) => (
			<IndeterminateCheckbox
				id="select-all"
				role="checkbox"
				checked={table.getIsAllRowsSelected()}
				indeterminate={table.getIsSomeRowsSelected()}
				onChange={table.getToggleAllRowsSelectedHandler()}
			/>
		),
		cell: ({ row, table }) => (
			<IndeterminateCheckbox
				id={`select-row-${row.id}`}
				role="checkbox"
				allRowSelectable={true}// make all row seclectable by adding label with absolute 
				checked={row.getIsSelected()}
				indeterminate={row.getIsSomeSelected()}
				onChange={row.getToggleSelectedHandler()}
				onClick={(e) => {
					if (e.shiftKey) {
						const { rows, rowsById } = table.getRowModel();
						const rowsToToggle = getRowRange(rows, row.id, lastSelectedId);
						const isLastSelected = rowsById[lastSelectedId].getIsSelected();
						rowsToToggle.forEach((row) => row.toggleSelected(isLastSelected));
					}

					lastSelectedId = row.id;
				}}
			/>
		),
		meta: {
			width: 50,
		},
	};
}

function getRowRange<T>(rows: Array<Row<T>>, idA: string, idB: string) {
	const range: Array<Row<T>> = [];
	let foundStart = false;
	let foundEnd = false;
	for (let index = 0; index < rows.length; index += 1) {
		const row = rows[index];
		if (row.id === idA || row.id === idB) {
			if (foundStart) {
				foundEnd = true;
			}
			if (!foundStart) {
				foundStart = true;
			}
		}

		if (foundStart) {
			range.push(row);
		}

		if (foundEnd) {
			break;
		}
	}

	return range;
}
