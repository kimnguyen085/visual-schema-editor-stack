import React, { useEffect, useState } from "react";
import './layouts.css';
import ToolBox from "../components/ToolBox";
import ButtonBox from "../components/ButtonBox";
import ActionButton from "../components/ActionButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { generateJsonSchema } from "../utils/JsonUtils";
import {useSelector, useDispatch} from "react-redux";
import * as Actions from '../store/actions/app.actions';
import DialogMessage from "../components/DialogMessage";


function RightLayout() {
  const dispatch = useDispatch();
  const jsonTreeSchema = useSelector(({app}) => app.jsonTreeSchema);
  const [open, setOpen] = useState(false);
  const generatedSchema = useSelector(({app}) => app.generatedSchema);

  const viewButtonClick = () => {
    dispatch(Actions.viewJsonSchema(generateJsonSchema(jsonTreeSchema)));
    handleClickToOpen();
  }

  const clearButtonClick = () => {
    dispatch(Actions.clearJsonSchema());
  }

  const saveButtonClick = () => {
    dispatch(Actions.saveJsonSchema(generatedSchema));
  }

  const handleClickToOpen = () => {
    setOpen(true);
  };
  
  const handleToClose = () => {
    setOpen(false);
  };

  useEffect(() => {

  }, [open, generatedSchema]);

  return <React.Fragment>
    <div className="body-right-panel">
      <ToolBox/>
      <ButtonBox>
        <ActionButton label={"View Schema"} onClick={viewButtonClick}/>
      </ButtonBox>
      <ButtonBox>
        <ActionButton label={"Clear Schema"} onClick={clearButtonClick}/>
      </ButtonBox>
      <ButtonBox>
        <ActionButton label={"Save Schema"} onClick={saveButtonClick}/>
      </ButtonBox>
    </div>
    <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"Generated Json Schema"}</DialogTitle>
        <DialogContent>
          <textarea style={{height:"450px", width:"400px"}} readOnly="readOnly" value={JSON.stringify(generatedSchema, undefined, 4)}/>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToClose} 
                  color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    <DialogMessage/>
  </React.Fragment>;
}

export default RightLayout;
