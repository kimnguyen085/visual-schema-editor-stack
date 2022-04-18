import React, { useEffect, useState } from "react";
import './components.css';
import { useDrop } from 'react-dnd';
import { ItemTypes } from "../utils/Constants";
import * as Actions from "../store/actions/app.actions";
import {useSelector, useDispatch} from "react-redux";

function StageBoxDroppableZone(props) {
  const dispatch = useDispatch();
  const jsonTreeSchema = useSelector(({app}) => app.jsonTreeSchema);
  // const treeKey = props.treeKey;
  // const treeValue = props.treeValue;

  const [{ isOver, item }, drop] = useDrop(() => ({
    accept: ItemTypes.OBJECT,
    drop: (item, monitor) => {
      console.log('picking ' + item.label + ' dropped to '+props.label + ' ,' + props.value);
      var objKey = item.treeKey;var objValue = item.treeValue;
      var obj = {};
      obj[objKey] = objValue;
      dispatch(Actions.addJsonSchema(jsonTreeSchema, obj, props.label));
    },
    canDrop: () => true,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      item: monitor.getItem()
    }),
  }), [])

  return <React.Fragment>
    <div className={`stage-box-droppable-item ${isOver && "stage-box-droppable-item-is-over"}`} ref={drop}>
      <img className="tool-box-item-ico" src={props.src}/> 
      <span>{props.label} {props.value && " : " + props.value}</span>
    </div>
  </React.Fragment>;
}

export default StageBoxDroppableZone;
