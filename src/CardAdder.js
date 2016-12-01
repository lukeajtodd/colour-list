import React from 'react';

const CardAdder = ({submit, save, clear}) => {
    let inputStyles = {
        width: "80%",
        display: "block",
        padding: 0,
        margin: "0 auto",
        marginBottom: 20,
        fontSize: 18
    }

    let submitStyles = {
        width: 90,
        height: 25,
        padding: 0,
        display: "block",
        margin: "0 auto 10px auto",
        fontSize: 18
    }

    let input;

    return (
        <form onSubmit={(e) => { 
            submit(e, input.value);
            input.value = '';
        }}>
            <input ref={(node) => { input = node; }} style={inputStyles} type="text" placeholder='#'/>
            <button style={submitStyles} type="submit"> ADD </button>
            <button onClick={(e) => { save(e) }} style={submitStyles}>SAVE</button>
            <button onClick={(e) => { clear(e) }} style={submitStyles}>CLEAR</button>
        </form>
    )
};

export default CardAdder;