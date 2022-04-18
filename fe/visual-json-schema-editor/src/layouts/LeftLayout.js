import React, { useEffect, useState } from "react";
import './layouts.css';
import StageBox from "../components/StageBox";

function LeftLayout() {

  return <React.Fragment>
    <div className="body-left-panel">
          <StageBox/>
    </div>
  </React.Fragment>;
}

export default LeftLayout;
