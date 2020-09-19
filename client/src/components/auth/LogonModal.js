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
import {
  colMagenta,
  colPurple,
  colSalmon,
  colViridianGreen,
} from '../../helpers/colors';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  paper: {
    width: '500px',
    position: 'relative',
    outline: 'none',
    textAlign: 'center',
    borderRadius: '20px',
    padding: '10px',
  },
  padded: { marginTop: '10px', marginBottom: '10px' },
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
        <Paper className={classes.paper} elevation={2}>
          <FontAwesomeIcon
            icon={faLock}
            style={{
              position: 'relative',
              marginTop: '-60px',
              height: '70px',
              width: '70px',
              color: 'white',
              backgroundColor: colPurple,
              padding: '20px',
              borderRadius: '60px',
            }}
          />

          <FormControl className={classes.modal}>
            <TextField
              id='outlined-basic'
              label='Username'
              variant='outlined'
              size='small'
              className={classes.padded}
            />

            <TextField
              id='outlined-basic'
              label='Password'
              variant='outlined'
              size='small'
              className={classes.padded}
            />

            <Button
              variant='contained'
              color='primary'
              onClick={() => handleCloseClick()}
              style={{ backgroundColor: colSalmon, width: '220px' }}
              className={classes.padded}
            >
              Logon
            </Button>

            <hr
              style={{
                border: '1px solid #d1d1d1',
                backgroundColor: '#d1d1d1',
                width: '100px',
              }}
            />

            <Typography style={{ fontFamily: 'Quicksand' }}>
              Not A Member?
            </Typography>

            <Link to='/register' style={{ textDecoration: 'none' }}>
              <Button
                style={{ color: colSalmon }}
                className={classes.padded}
                onClick={() => handleCloseClick()}
              >
                Register
              </Button>
            </Link>
          </FormControl>
        </Paper>
      </Fade>
    </Modal>
  );
};
