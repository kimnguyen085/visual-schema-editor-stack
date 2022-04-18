import React, { useEffect, useState } from "react";
import './components.css';

function ButtonBox(props) {

  return <React.Fragment>
    <div className="button-box-content">
      {props.children}
    </div>
  </React.Fragment>;
}

export default ButtonBox;
