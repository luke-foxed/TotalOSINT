import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Paper, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

export const LogonModal = ({ onCloseClick }) => {
  const classes = useStyles();

  const handleCloseClick = () => {
    onCloseClick();
  };

  return (
    <Modal
      className={classes.modal}
      open={true}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <Paper
          style={{
            width: '600px',
            textAlign: 'center',
            outline: 'none',
          }}
          elevation={2}
        >
          <div style={{ backgroundColor: '#dbdbdb', width: '100%' }}>
            <Typography variant='h5' style={{ fontFamily: 'Quicksand' }}>
              Login
            </Typography>
          </div>
          <div className={classes.modal} style={{ paddingTop: '10px' }}>
            <FontAwesomeIcon icon={faUser} color='purple' size='6x' />

            <Button onClick={() => handleCloseClick()}>Click me</Button>
          </div>
        </Paper>
      </Fade>
    </Modal>
  );
};
