import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { LogonModal } from '../auth/LogonModal';
import { colViridianGreen } from '../../helpers/colors';

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

const Navbar = () => {
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
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            News
          </Typography>

          {/* <Link
            to='/auth'
            style={{
              textDecoration: 'none',
              color: 'white',
            }}
          >
            <Button color='inherit'>Login</Button>
          </Link> */}

          <Button color='inherit' onClick={() => openModal(true)}>
            Login
          </Button>

          {isOpen && <LogonModal onCloseClick={() => setOpen(false)} />}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
