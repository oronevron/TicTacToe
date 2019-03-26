import React from "react";
import "./Cell.css";
import xImage from "../../assests/x.svg";
import oImage from "../../assests/o.svg";

const Cell = (props) => {
    return (
        <div
            className="cell-container"
            onClick={props.onClick}
        >
            {
                props.value &&
                <img
                    src={props.value === 'X' ? xImage : oImage}
                    className="cell-image"
                />
            }
        </div>
    );
}

export default Cell;