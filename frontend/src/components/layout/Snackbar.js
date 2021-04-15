import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import { createMessage } from '../../actions/message';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const CustomizedSnackbars = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const snackbarMessage = useSelector(state => state.message.msg);
  const snackbarType = useSelector(state => state.message.type);
  const snackbarOpen = useSelector(state => state.message.open);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(createMessage(snackbarMessage, snackbarType, false));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          color={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;