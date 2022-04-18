import React, { useEffect, useState } from "react";
import './components.css';
import {Snackbar, IconButton, Icon, SnackbarContent, Typography} from '@material-ui/core';
import {green, amber, blue, red} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/styles';
import * as Actions from '../store/actions/app.actions';
import {useDispatch, useSelector} from 'react-redux';

const useStyles = makeStyles(theme => ({
  root   : {},
  success: {
      backgroundColor: green[600],
      color          : '#FFFFFF'
  },
  error  : {
    backgroundColor: red[600],
    color          : '#FFFFFF'
  },
  info   : {
      backgroundColor: blue[600],
      color          : '#FFFFFF'
  },
  warning: {
      backgroundColor: amber[600],
      color          : '#FFFFFF'
  }
}));

const variantIcon = {
  success: "check_circle",
  warning: "warning",
  error  : "error",
  info   : "info"
};

function DialogMessage(props) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector(({app}) => app.messageState);
  const options = useSelector(({app}) => app.messageOptions);

  return (
    <Snackbar
      {...options}
      open={state}
      onClose={() => dispatch(Actions.hideMessage())}
      classes={{
          root: classes.root
      }}
  >
      <SnackbarContent
          className={classes[options.variant]}
          message={
              <div className="flex items-center">
                  {variantIcon[options.variant] && (
                      <Icon color="inherit">{variantIcon[options.variant]}</Icon>
                  )}
                  <Typography className="mx-8">{options.message}</Typography>
              </div>
          }
      />
  </Snackbar>);
}

export default React.memo(DialogMessage);
