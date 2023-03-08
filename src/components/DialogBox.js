import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import toast, { Toaster } from "react-hot-toast";



const useStyles = makeStyles((theme) => ({
    textField: {
      marginBottom: theme.spacing(2),
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
    dialogPaper: {
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing(2),
    },
    cancelButton: {
      backgroundColor: "white",
      color: "black",
      border: "2px solid black",
      padding: theme.spacing(1),
      borderRadius: theme.spacing(1),
    },
  }));
  



function DialogBox(props) {

    const classes = useStyles();
  
    const closeDialogBox = () => {
      props.closeDialogBox();
    }

    return (
      <Dialog
        open={props.dialogBoxOpen}
        classes={{ paper: classes.dialogPaper }}
      >
        {props.dialogBoxText}
        <Button onClick={closeDialogBox} color="primary">
              Close
        </Button>
      </Dialog>
    );
  }

export default DialogBox;

