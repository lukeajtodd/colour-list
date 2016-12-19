import React from 'react';

const OverwritePopup = () => {
  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "#333",
    opacity: 0.4,
    zIndex: 98
  }

  const popupStyles = {
    position: "fixed",
    top: "50vh",
    left: "50vw",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    width: "30vw",
    height: "20vh",
    zIndex: 99
  }

  let overwritten;

  return (
    <div>
      <div style={overlayStyles}></div>
      <div style={popupStyles}>
        <form>
          <label>Overwrite?</label>
          <button onClick={(e) => {
            e.preventDefault();
            overwritten = true;
          }}>YES</button>
          <button onClick={(e) => {
            e.preventDefault();
            overwritten = false;
          }}>NO</button>
        </form>
      </div>
    </div>
  )
}

export default OverwritePopup;
