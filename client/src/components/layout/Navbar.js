import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { LogonModal } from '../auth/LogonModal';
import { colViridianGreen } from '../../helpers/colors';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ login, setAlert }) => {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
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
          <Typography variant='h5' className={classes.title}>
            GameCatcher
          </Typography>

          <Button color='inherit' onClick={() => openModal(true)}>
            Login
          </Button>

          {isOpen && (
            <LogonModal
              onCloseClick={() => setOpen(false)}
              onLogonClick={(username, password) => login(username, password)}
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
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, login })(Navbar);
