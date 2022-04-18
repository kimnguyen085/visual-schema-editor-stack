import React, { useEffect, useState } from "react";
import './components.css';
import { ItemTypes } from "../utils/Constants";
import { useDrag } from 'react-dnd';

function ToolBoxItem(props) {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.OBJECT,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
    item: props,
  }));

  return (
    <div className="tool-box-item" ref={drag} style={{
      opacity: isDragging ? 0.5 : 1,
      cursor: isDragging ? 'move' : 'auto'
    }}>
      <img className="tool-box-item-ico" src={props.src}/> 
      <span>{props.label}</span>
    </div>
  )
}

export default ToolBoxItem;
