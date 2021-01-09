import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { FavoriteOutlined } from '@material-ui/icons';
import { colPrimary } from '../../helpers/colors';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  leftGridCell: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    width: '70%',
    margin: 'auto',
    '& p': {
      color: 'white',
      fontFamily: 'Quicksand',
    },
    '& a': {
      padding: isMobile ? '5px' : '15px',
      textDecoration: 'none',
      color: 'white',
      fontFamily: 'Quicksand',
      textAlign: 'center',
      transition: 'all .2s ease-in-out',
      '&:hover': {
        color: colPrimary,
        transform: 'scale(1.1)',
      },
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Toolbar
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginTop: '10vh',
        minHeight: '60px',
        padding: '10px',
      }}
    >
      <div className={classes.footer}>
        <Grid
          container
          spacing={2}
          alignItems='center'
          justify='center'
          alignContent='center'
          direction='row'
        >
          <Grid
            container
            item
            sm={6}
            xs={12}
            justify={isMobile ? 'center' : 'flex-start'}
          >
            <div className={classes.leftGridCell}>
              <Typography>Made with</Typography> &nbsp;
              <FavoriteOutlined style={{ color: colPrimary }} /> &nbsp;
              <Typography>by Luke Fox, 2021</Typography>
            </div>
          </Grid>
          <Grid
            container
            item
            sm={6}
            xs={12}
            justify={isMobile ? 'center' : 'flex-end'}
          >
            <Link to='/about'>About</Link>
            <a
              rel='noopener noreferrer'
              href='https://github.com/Foxyf76/TotalOSINT'
              target='_blank'
            >
              Source Code
            </a>
            <a
              href='mailto:lukefoxportfolio@gmail.com'
              rel='noopener noreferrer'
              target='_blank'
            >
              Contact
            </a>
          </Grid>
        </Grid>
      </div>
    </Toolbar>
  );
};

export default Footer;
