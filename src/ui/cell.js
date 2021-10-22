export class Cell {
	constructor(cell, data) {
		let cellData;
		if (cell instanceof Cell) {
			cellData = {
				index: cell.index,
				board: cell.__board,
				mines: cell.__mines,
				status: cell.status,
				...data,
			};
		} else {
			cellData = cell;
		}

		this.__board = cellData.board;
		this.__mines = cellData.mines;
		this.status = cellData.status || "hidden";
		this.index = cellData.index;
		this.column = getCellColumn(this.index, this.__board);
		this.row = getCellRow(this.index, this.__board);
	}

	hasMine() {
		return this.__mines ? this.__mines.includes(this.index) : false;
	}

	get adjacentIndexMatrix() {
		let board = this.__board;
		let row = this.row;
		let column = this.column;
		// prettier-ignore
		return [

			/*      left                     center               right */
			/* 1 */ [ row - 1, column - 1 ], [ row - 1, column ], [ row - 1, column + 1 ],

			/* 2 */ [ row,     column - 1 ],      /*  💣  */      [ row,     column + 1 ],

			/* 3 */ [ row + 1, column - 1 ], [ row + 1, column ], [ row + 1, column + 1 ],

		].map(([row, column]) => {
			return getIndexByRowAndColumn({ row, column, board })
		})
	}

	get adjacentMineCount() {
		return this.hasMine()
			? -1
			: this.adjacentIndexMatrix.reduce((count, index) => {
					return this.__mines && index != null
						? this.__mines.includes(index)
							? ++count
							: count
						: count;
			  }, 0);
	}
}

function getCellRow(index, board) {
	return Math.floor(index / board.columns);
}

function getCellColumn(index, board) {
	return index % board.columns;
}

function getIndexByRowAndColumn({ board, row, column }) {
	if (
		row < 0 ||
		column < 0 ||
		row > board.rows - 1 ||
		column > board.columns - 1
	) {
		return null;
	}
	return row * board.columns + column;
}
