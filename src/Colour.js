import React from 'react';

const Colour = ({color}) => {

    let blockStyle = {
        width: "100%",
        height: 100,
        backgroundColor: color
    };

    return (
        <div style={blockStyle}></div>
    )
}

export default Colour;