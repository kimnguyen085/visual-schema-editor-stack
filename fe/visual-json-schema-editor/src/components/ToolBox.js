import React, { useEffect, useState } from "react";
import './components.css';
import ToolBoxItem from "./ToolBoxItem";
import typeIco from "../assets/type24.png";
import propertiesIco from "../assets/properties24.png";
import requiredIco from "../assets/required24.png";
import dependenciesIco from "../assets/dependencies24.png";
import dependencyItemIco from "../assets/items-24.png";
import itemIco from "../assets/items24.png";
import enumIco from "../assets/enum24.png";
import ofIco from "../assets/options24.png";
import notIco from "../assets/not24.png";
import refIco from "../assets/ref24.png";
import definitionsIco from "../assets/object24.png";

function ToolBox() {

  return <React.Fragment>
    <div className="tool-box-content">
      <ToolBoxItem src={typeIco} label={"string"} treeKey={"prop"} treeValue={"string"}></ToolBoxItem>
      <ToolBoxItem src={typeIco} label={"integer"} treeKey={"prop"} treeValue={"integer"}></ToolBoxItem>
      <ToolBoxItem src={typeIco} label={"number"} treeKey={"prop"} treeValue={"number"}></ToolBoxItem>
      <ToolBoxItem src={typeIco} label={"boolean"} treeKey={"prop"} treeValue={"boolean"}></ToolBoxItem>
      <ToolBoxItem src={typeIco} label={"object"} treeKey={"prop"} treeValue={"object"}></ToolBoxItem>
      <ToolBoxItem src={typeIco} label={"array"} treeKey={"prop"} treeValue={"array"}></ToolBoxItem>
      <ToolBoxItem src={typeIco} label={"null"} treeKey={"prop"} treeValue={"null"}></ToolBoxItem>
      <ToolBoxItem src={propertiesIco} label={"properties"} treeKey={"properties"} treeValue={{}}></ToolBoxItem>
      <ToolBoxItem src={requiredIco} label={"required"}></ToolBoxItem>
      <ToolBoxItem src={dependenciesIco} label={"dependencies"}></ToolBoxItem>
      <ToolBoxItem src={dependencyItemIco} label={"dependencyItem"}></ToolBoxItem>
      <ToolBoxItem src={itemIco} label={"items"}></ToolBoxItem>
      <ToolBoxItem src={enumIco} label={"enum"}></ToolBoxItem>
      <ToolBoxItem src={ofIco} label={"allOf"}></ToolBoxItem>
      <ToolBoxItem src={ofIco} label={"anyOf"}></ToolBoxItem>
      <ToolBoxItem src={ofIco} label={"oneOf"}></ToolBoxItem>
      <ToolBoxItem src={notIco} label={"not"}></ToolBoxItem>
      <ToolBoxItem src={refIco} label={"ref"}></ToolBoxItem>
      <ToolBoxItem src={definitionsIco} label={"definitions"}></ToolBoxItem>
      
    </div>
  </React.Fragment>;
}

export default ToolBox;
