import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid, Grow } from '@material-ui/core';
import { FavoriteOutlined } from '@material-ui/icons';
import { colPrimary } from '../../helpers/colors';

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
      padding: '15px',
      textDecoration: 'none',
      color: 'white',
      fontFamily: 'Quicksand',
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
        height: '60px',
      }}
    >
      <div className={classes.footer}>
        <Grid
          container
          spacing={0}
          alignItems='center'
          justify='center'
          alignContent='center'
          direction='row'
        >
          <Grid container item xs={6} justify='flex-start'>
            <div className={classes.leftGridCell}>
              <Typography>Made with</Typography> &nbsp;
              <FavoriteOutlined style={{ color: colPrimary }} /> &nbsp;
              <Typography>by Luke Fox, 2021</Typography>
            </div>
          </Grid>
          <Grid container item xs={6} justify='flex-end'>
            <a>About</a>
            <a
              rel='noopener noreferrer'
              href='https://github.com/Foxyf76/TotalOSINT'
              target='_blank'
            >
              View Source Code
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
