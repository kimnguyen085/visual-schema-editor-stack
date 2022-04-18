import React from "react";
import './components.css';

function ActionButton(props) {
  return (
      <button className="button-item" onClick={props.onClick}> 
        <span>{props.label}</span>
      </button>
  )
}

export default ActionButton;
