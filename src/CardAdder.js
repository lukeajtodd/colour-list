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

    let inputHex, inputName;

    return (
        <form onSubmit={(e) => {
            submit(e, inputHex.value);
            inputHex.value = '';
            inputName.value = '';

        }}>
            <input ref={(node) => { inputHex = node; }} style={inputStyles} type="text" placeholder='#'/>
            <button style={submitStyles} type="submit"> ADD </button>
            <form onSubmit={(e) => { save(e, inputName.value) }}>
              <input ref={(node) => { inputName = node; }} type="text" style={inputStyles} required/>
              <button type="submit" style={submitStyles}>SAVE</button>
            </form>
            <button onClick={(e) => { clear(e) }} style={submitStyles}>CLEAR</button>
        </form>
    )
};

export default CardAdder;
