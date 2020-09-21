import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { login, logout } from '../../actions/auth';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { LogonModal } from '../auth/LogonModal';
import { colViridianGreen } from '../../helpers/colors';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { Grid, InputBase, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = ({ login, setAlert, user, isAuthenticated, logout }) => {
  console.log(user);
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const attemptLogin = async (username, password) => {
    await login(username, password);
  };

  return (
    <div className={classes.root} style={{ paddingBottom: '40px' }}>
      <AppBar
        position='static'
        style={{
          backgroundColor: colViridianGreen,
        }}
      >
        <Toolbar
          style={{
            width: '65%',
            margin: 'auto',
          }}
        >
          <Grid
            container
            spacing={0}
            alignItems='center'
            justify='center'
            direction='row'
          >
            <Grid item xs={2}>
              <Typography variant='h5'>TotalOSINT</Typography>
            </Grid>

            <Grid item xs={4}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder='Search…'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Grid>

            <Grid item xs={1} />

            <Grid item xs={5} alignItems='center'>
              {isAuthenticated & (user != null) ? (
                <Grid container justify='flex-end'>
                  <Typography style={{ padding: '10px' }}>
                    {user.username}
                  </Typography>
                  <Button onClick={() => logout()}>Log Out</Button>
                </Grid>
              ) : (
                <Grid container justify='flex-end'>
                  <Button color='inherit' onClick={() => openModal(true)}>
                    Login
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>

          {isOpen && (
            <LogonModal
              onCloseClick={() => setOpen(false)}
              onLogonClick={(username, password) =>
                attemptLogin(username, password)
              }
              onSetAlert={(message, type) => setAlert(message, type)}
            />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { setAlert, login, logout })(Navbar);
