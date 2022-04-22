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
  const isJsonChanges = useSelector(({app}) => app.isJsonChanges);
  const [children,setChildren] = useState([]);
  const [generatedSchema, setGeneratedSchema] = useState({});
  const [childrenSchema, setChildrenSchema] = useState({});
  const [labelToRemove, setLabelToRemove] = useState("");
  const [objToAdd, setObjToAdd] = useState({});
  const [projectionTree, setProjectionTree] = useState({});

  function buildTreeSchema(crrChildrenSchema) {
    console.log(crrChildrenSchema, childrenSchema, generatedSchema, props.label);
    // setChildrenSchema({...childrenSchema, ...crrChildrenSchema});
    // -> setChildrenSchema(crrChildrenSchema);
    setObjToAdd(crrChildrenSchema);
    // console.log(childrenSchema, generatedSchema );
  }

  function removeTreeSchema(crrChildrenSchema) {
    console.log(crrChildrenSchema, '++++++++++++');
    setProjectionTree(crrChildrenSchema);
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
    children.push(<StageBoxDroppableZone src={ico} label={label} value={value} removeFunc={(param) => removeNode(param)} buildTreeSchemaFunc={(obj) => buildTreeSchema(obj)} removeTreeSchemaFunc={removeTreeSchema} parentNode={{"label": label}}/>);
    setChildren(children);
    // console.log(children);
  }

  function removeNode(label) {
    console.log('clicked', generatedSchema, label, children);
    // modify children
    if (label == null) {
      // remove all
      while (children.length !== 0) {
        children.splice(0, 1);
      }
      setChildren(children);
    } else {
      let newChildren = children.filter(obj => {return obj.props.label !== label});
      setChildren(newChildren);
    }
    // setLabelToRemove(label);
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
    console.log('generated schema changed', generatedSchema);
  }, [ generatedSchema ]);

  useEffect(() => {

  },[children])

  useEffect(() => {
    let newChildrenSchema = merge(childrenSchema, objToAdd);
    console.log('objToAdd Changesss', newChildrenSchema, generatedSchema, props.label);
    setChildrenSchema(newChildrenSchema);

    var toSend = {};
    if (props.parentNode && props.label.includes('prop') && !props.label.includes('properties')) {
      // toSend[props.label] = {...generatedSchema[props.label], ...childrenSchema};
      toSend[props.label] = merge(generatedSchema[props.label], childrenSchema);
      console.log(1, props.parentNode.label);
    } else if (props.parentNode && props.label.includes('properties')) {
      // toSend[props.label] = {...generatedSchema[props.label], ...childrenSchema};
      toSend[props.label] = merge(generatedSchema[props.label], childrenSchema);
      console.log(2, props.parentNode); // parentNode not using anywhere
    } else {
      // toSend = {...generatedSchema, ...childrenSchema};
      toSend = merge(generatedSchema, childrenSchema);
    }
    console.log(toSend, props.label, childrenSchema, generatedSchema, '3333333333333');
    setGeneratedSchema(toSend);
    props.buildTreeSchemaFunc(generatedSchema);
  }, [objToAdd])

  useEffect(() => {

  },[childrenSchema])

  useEffect(() => {
    setChildren([]);
    setChildrenSchema({});
    setGeneratedSchema({});
    removeNode(null);
  },[clearSchema])

  // useEffect(() => {
  //   // modify generated schema
  //   if (generatedSchema[props.label])
  //     generatedSchema[props.label] = projectionTree;
  //
  //   props.removeTreeSchemaFunc(generatedSchema);
  //   setGeneratedSchema(generatedSchema);
  // }, [projectionTree])

  // useEffect(() => {
  //   // console.log('isJsonChange', generatedSchema);
  //   // props.buildTreeSchemaFunc(generatedSchema);
  //
  //   console.log(generatedSchema);
  //   // modify generated schema
  //   generatedSchema[props.label] && Object.keys(generatedSchema[props.label]).map((key, idx) => {
  //     if (key == labelToRemove) {
  //       console.log(generatedSchema[props.label], key, labelToRemove , "_+_+_+_+_+_+");
  //       // delete generatedSchema[props.label][key];
  //     }
  //   });
  //   console.log('---------------', generatedSchema, labelToRemove);
  //   props.removeTreeSchemaFunc(generatedSchema);
  //   setGeneratedSchema(generatedSchema);
  // }, [labelToRemove])

  Object.entries(generatedSchema).length == 0 && generateSchema(props.label, props.value);

  return <React.Fragment >
    <ul>
      <li>
        <div className={`stage-box-droppable-item ${isOver && "stage-box-droppable-item-is-over"}`} ref={drop}>
          <img onClick={() => props.removeFunc(props.label)} className="tool-box-item-ico" src={props.src}/>
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
