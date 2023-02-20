import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MetaMaskConnector from "./Wallet/MetaMaskConnector";
import { Web3Button } from "@web3modal/react";


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
  
    const cancelButton = () => {
      props.cancelButton();
    };
  
    //open dialog with authcontext flag
    return (
      <Dialog
        open={props.dialogBoxOpen}
        classes={{ paper: classes.dialogPaper }}
      >
        <MetaMaskConnector />
        <Web3Button />
        <Button className={classes.cancelButton} onClick={cancelButton}>
          Cancel
        </Button>
      </Dialog>
    );
  }

export default DialogBox;

