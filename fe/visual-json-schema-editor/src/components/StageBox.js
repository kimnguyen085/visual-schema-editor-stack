import React, { useEffect, useState } from "react";
import './components.css';
import {useSelector, useDispatch} from "react-redux";
import StageBoxDroppableZone from "./StageBoxDroppableZone";
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
import jsonIco from "../assets/json.png";
import * as Actions from "../store/actions/app.actions";

function StageBox() {
  const dispatch = useDispatch();
  const generatedSchema = useSelector(({app}) => app.generatedSchema);
  const jsonTreeSchema = useSelector(({app}) => app.jsonTreeSchema);
  const loading = useSelector(({app}) => app.loading);
  const [audit, setAudit] = useState(true);
  const [implementation, setImplementation] = useState(true);
  const [allComponents, setallComponents] = useState([]);

  function buildTreeSchema(childrenSchema) {
    var schema = {...childrenSchema};
    console.log(schema);
    dispatch(Actions.generateJsonSchema(schema));
  }

  function generateRandomId() {
    return Math.random();
  };

  function getIco(name) {
    console.log(name);
    name = name+'';
    if(name == 'string' || name == 'array' ||name == 'integer' ||name == 'number' ||name == 'boolean' ||
        name == 'object' ||name == 'null') 
      return typeIco;
    if (name == 'properties')
      return propertiesIco;
    
    return jsonIco;
  }

  function recursiveDisplayJson(sourceObject){
    return (
      typeof sourceObject === 'object' && Object.keys(sourceObject).map((key, idx) => { return (
        <ul id={generateRandomId()}>
          <li id={generateRandomId()}>{key} <span>{typeof sourceObject[key] !== 'object' && sourceObject[key]}</span></li>
          {recursiveDisplayJson(sourceObject[key])}
        </ul>
      )}) 
    )
  }

  function recursiveDisplayTree(sourceObject){
    {/** Can deal with collapsable using css display: none */}
    return (
      typeof sourceObject === 'object' && Object.keys(sourceObject).map((key, idx) => { return (
        <ul id={generateRandomId()}>
          <li id={generateRandomId()}><StageBoxDroppableZone src={getIco(key)} label={key} value={typeof sourceObject[key] !== 'object' && sourceObject[key]}/></li>
          {recursiveDisplayTree(sourceObject[key])}
        </ul>
      )})   
    )
  }

  useEffect(()=> {

  }, [loading, jsonTreeSchema])

  return <React.Fragment>
    <div className="stage-box-content">
      {
        <StageBoxDroppableZone src={jsonIco} label={"jsonSchema"} value={"schema"} removeFunc={() => {return true}} buildTreeSchemaFunc={buildTreeSchema} parentNode={null} isRoot={true}/>
      }
      {
        recursiveDisplayTree(jsonTreeSchema)
      }
    </div>
  </React.Fragment>;
}

export default StageBox;
