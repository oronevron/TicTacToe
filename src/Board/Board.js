import React from "react";
import Cell from "../Cell/Cell";
import "./Board.css";

const Board = (props) => {
    const rowsIndices = [0, 1, 2];
    const cellsIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let rowsCounter = 1;

    return (
        <div className="board-container">
            {
                rowsIndices.map((rowIndex) =>
                    <div
                        key={`row${rowIndex}`}
                        className="board-row"
                    >
                        {
                            cellsIndices.slice(rowIndex * 3, rowsCounter++ * 3).map((cellIndex) =>
                                <Cell
                                    key={`cell${cellIndex}`}
                                    value={props.cells[cellIndex]}
                                    onClick={() => props.onClick(cellIndex)}
                                />
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Board;