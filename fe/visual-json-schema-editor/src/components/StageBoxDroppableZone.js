import React, { useEffect, useState, useRef } from "react";
import './components.css';
import { useDrop } from 'react-dnd';
import { ItemTypes } from "../utils/Constants";
import * as Actions from "../store/actions/app.actions";
import {useSelector, useDispatch} from "react-redux";
import jsonIco from "../assets/json.png";
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
import {clear} from "@testing-library/user-event/dist/clear";

var merge = require('lodash.merge');
const stageBoxDroppable = function StageBoxDroppableZone(props) {
  const dispatch = useDispatch();
  const jsonTreeSchema = useSelector(({app}) => app.jsonTreeSchema);
  const clearSchema = useSelector(({app}) => app.clearSchema);
  const [children,setChildren] = useState([]);
  const [generatedSchema, setGeneratedSchema] = useState({});
  const [childrenSchema, setChildrenSchema] = useState({});

  function buildTreeSchema(crrChildrenSchema) {
    console.log(crrChildrenSchema, childrenSchema, generatedSchema, props.label);
    // setChildrenSchema({...childrenSchema, ...crrChildrenSchema});
    setChildrenSchema(crrChildrenSchema);
    // console.log(childrenSchema, generatedSchema );
  }

  function generateSchema(label, value) {
    let schema = {};
    if (label.includes('prop') && !label.includes('properties')){
      schema[label] = {"type": value};
    } else if (label.includes('properties')) {
      schema[label] = {};
    } else {
      schema[label] = value;
    }
    console.log('generated', schema);
    setGeneratedSchema(schema);
  }

  function createChildren(ico, label, value) {
    var counter = children.length;
    label = children.length > 0 ? (label+''+counter) : label;
    children.push(<StageBoxDroppableZone src={ico} label={label} value={value} removeFunc={(param) => removeNode(param)} buildTreeSchemaFunc={buildTreeSchema} parentNode={{"label": label}}/>);
    setChildren(children);
    // console.log(children);
  }

  function removeNode(node) {
    console.log('clicked');
    children.splice(children.indexOf(node), 1);
    setChildren(children);
    dispatch(Actions.jsonTreeChanges());
  }

  const [{ isOver, item }, drop] = useDrop(() => ({
    accept: ItemTypes.OBJECT,
    drop: (item, monitor) => {
      let objKey = item.treeKey;let objValue = item.treeValue;
      let obj = {};
      obj[objKey] = objValue;
      console.log('create children ', item.treeKey, item.treeValue, monitor.getItem());
      createChildren(item.src, item.treeKey, item.treeValue);
    },
    canDrop: () => true,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      item: monitor.getItem()
    }),
  }), [])

  useEffect(() => {
    // if (childrenSchema)
    // Object.entries(childrenSchema).length == 0 && buildTreeSchema();
    // setGeneratedSchema({...generatedSchema, ...childrenSchema});

    if(generatedSchema && Object.entries(generatedSchema).length !== 0){
      // merging
      var toSend = {};
      if (props.parentNode && props.label.includes('prop') && !props.label.includes('properties')) {
        // toSend[props.label] = {...generatedSchema[props.label], ...childrenSchema};
        toSend[props.label] = merge(generatedSchema[props.label], childrenSchema);
        console.log(1, props.parentNode.label);
      } else if (props.parentNode && props.label.includes('properties')) {
        // toSend[props.label] = {...generatedSchema[props.label], ...childrenSchema};
        toSend[props.label] = merge(generatedSchema[props.label], childrenSchema);
        console.log(2, props.parentNode);
      } else {
        // toSend = {...generatedSchema, ...childrenSchema};
        toSend = merge(generatedSchema, childrenSchema);
      }
      console.log(toSend, props.label, childrenSchema);

      props.buildTreeSchemaFunc(toSend);
      // props.buildTreeSchemaFunc({...generatedSchema, ...childrenSchema});
    }

    // props.buildTreeSchemaFunc(generatedSchema);
  }, [children, generatedSchema, childrenSchema]);

  useEffect(() => {
    // if (props.isRoot) {
      setChildren([]);
      setChildrenSchema({});
      setGeneratedSchema({});
      // Object.entries(generatedSchema).length == 0 && generateSchema(props.label, props.value);
    // }
  },[clearSchema])

  Object.entries(generatedSchema).length == 0 && generateSchema(props.label, props.value);

  return <React.Fragment >
    <ul>
      <li>
        <div className={`stage-box-droppable-item ${isOver && "stage-box-droppable-item-is-over"}`} ref={drop}>
          <img onClick={() => props.removeFunc(stageBoxDroppable)} className="tool-box-item-ico" src={props.src}/>
          <span>{props.label} {props.value && typeof props.value !== 'object' && " : " + props.value}</span>
        </div>
      </li>
      {
        children.map(component => {return component})
      }
    </ul>
  </React.Fragment>;
}

export default stageBoxDroppable;
