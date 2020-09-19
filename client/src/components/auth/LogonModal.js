import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
  Button,
  Divider,
  FormControl,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

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
            width: '500px',
            position: 'relative',
            outline: 'none',
            textAlign: 'center',
            borderRadius: '20px',
            padding: '10px',
          }}
          elevation={2}
        >
          <FontAwesomeIcon
            icon={faLock}
            style={{
              position: 'relative',
              marginTop: '-60px',
              height: '70px',
              width: '70px',
              color: 'white',
              backgroundColor: '#5eb6e6',
              padding: '20px',
              borderRadius: '60px',
            }}
          />

          <FormControl className={classes.modal} style={{ paddingTop: '10px' }}>
            <TextField
              id='outlined-basic'
              label='Username'
              variant='outlined'
            />

            <TextField
              id='outlined-basic'
              label='Password'
              variant='outlined'
              style={{ marginTop: '10px', marginBottom: '10px' }}
            />

            <Button
              variant='contained'
              color='primary'
              onClick={() => handleCloseClick()}
            >
              Logon
            </Button>

            <Divider orientation='vertical' />

            <Typography>Not A Member?</Typography>
          </FormControl>
        </Paper>
      </Fade>
    </Modal>
  );
};
