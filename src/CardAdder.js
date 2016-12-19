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

    let colorInput, nameInput;

    return (
        <div>
          <form onSubmit={(e) => {
              submit(e, colorInput.value);
              colorInput.value = '';
          }}>
              <input ref={(node) => { colorInput = node; }} style={inputStyles} type="text" placeholder='#'/>
              <button style={submitStyles} type="submit"> ADD </button>
          </form>
          <form onSubmit={(e) => {
            save(e, nameInput);
            nameInput.value = '';
          }}>
            <input ref={(node) => { nameInput = node; }} style={inputStyles} type="text" required/>
            <button type="submit" style={submitStyles}>SAVE</button>
          </form>
          <button onClick={(e) => { clear(e) }} style={submitStyles}>CLEAR</button>
        </div>
    )
};

export default CardAdder;
