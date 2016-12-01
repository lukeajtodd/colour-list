import React from 'react';

const Label = ({color, removeClick}) => {

    let labelContainerStyle = {
        position: "relative"
    }

    let buttonStyle = {
        position: "absolute",
        top: 0,
        right: 0
    };

    return (
        <div className="labelBlock" style={labelContainerStyle}>
            <h1 className="colorCode">{color}</h1>
            <button style={buttonStyle} onClick={() => { removeClick(color) }}> - </button>
        </div>
    )
}

export default Label;