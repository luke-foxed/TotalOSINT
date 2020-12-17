import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { performSearch } from '../../actions/search';
import { setAlert } from '../../actions/alert';
import { useDencrypt } from 'use-dencrypt-effect';
import {
  makeStyles,
  Grid,
  Button,
  TextField,
  MenuItem,
  Popper,
  Grow,
  Paper,
  MenuList,
  ClickAwayListener,
  withStyles,
  Typography,
  InputAdornment,
  Backdrop,
} from '@material-ui/core';
import {
  Search,
  ArrowDropDown,
  Language,
  PinDrop,
  Description,
} from '@material-ui/icons/';
import { checkInput } from '../../helpers';
import { colPrimary } from '../../helpers/colors';

const useStyles = makeStyles(() => ({
  textBoxRadius: {
    borderRadius: '15px',
    borderColor: 'rgba(255,255,255,.4)',
  },
  backdrop: {
    backdropFilter: 'blur(6px)',
    color: 'black',
    zIndex: 99,
  },
  searchButton: {
    backgroundColor: colPrimary,
    height: '100%',
    borderRadius: '15px',
    position: 'absolute',
    transition: 'all .2s ease-in-out',
    right: '0',
    '&:hover': {
      backgroundColor: colPrimary,
      transform: 'scale(0.8)',
    },
  },
  siteImage: {
    padding: '20px',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
}));

const CssTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'rgba(255,255,255,.6)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgba(255,255,255,.6)',
        border: '1px solid',
      },
    },
  },
})(TextField);

const RenderIcon = (index) => {
  switch (index) {
    case 0:
      return (
        <InputAdornment>
          <Language style={{ color: 'white', paddingRight: '10px' }} />
          <i style={{ paddingRight: '5px', color: colPrimary }}>www.</i>
        </InputAdornment>
      );
    case 1:
      return <Description style={{ color: 'white', paddingRight: '10px' }} />;
    case 2:
      return <PinDrop style={{ color: 'white', paddingRight: '10px' }} />;
  }
};

const options = ['Domain', 'Hash', 'IP'];
const headerValues = ['FILE HASH', 'IP ADDRESS', 'DOMAIN'];

const Home = ({ setAlert, performSearch }) => {
  const { result, dencrypt } = useDencrypt();
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [value, setValue] = useState('');

  const [searchResults, setSearchResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let i = 0;

    const action = setInterval(() => {
      dencrypt(headerValues[i]);

      i = i === headerValues.length - 1 ? 0 : i + 1;
    }, 3000);

    return () => clearInterval(action);
  }, []);

  const handleMenuItemClick = (_, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleSearchClick = async () => {
    if (!checkInput(options[selectedIndex], value)) {
      setAlert(`Please enter a valid ${options[selectedIndex]}`, 'error');
    } else {
      setIsLoading(true);
      let response = await performSearch(
        value,
        options[selectedIndex].toLowerCase()
      );
      setSearchResults(response);
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        width: '67%',
        margin: 'auto',
        maxHeight: '100vh',
      }}
    >
      <Typography
        style={{
          textAlign: 'center',
          margin: '80px',
          fontFamily: 'Yanone Kaffeesatz',
          color: 'white',
          fontSize: '50px',
        }}
      >
        ANY <b style={{ color: colPrimary }}>{result}</b>
      </Typography>

      <Grid
        container
        direction='row'
        alignItems='center'
        justify='center'
        spacing={0}
      >
        <Grid container item xs={3} sm={2} justify='center'>
          <Button
            ref={anchorRef}
            color='primary'
            size='medium'
            variant='contained'
            style={{
              height: '55px',
              width: '110px',
              borderRadius: '15px',
              backgroundColor: colPrimary,
            }}
            onClick={handleToggle}
          >
            {options[selectedIndex]}
            <ArrowDropDown />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            getContentAnchorEl={null}
            transition
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper style={{ marginTop: '10px', borderRadius: '15px' }}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id='split-button-menu'>
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Grid>

        <Grid container item xs={9} sm={10} justify='center'>
          <CssTextField
            variant='outlined'
            style={{ width: '100%' }}
            onInput={(e) => {
              setValue(e.target.value);
            }}
            InputProps={{
              style: {
                color: 'white',
              },
              classes: {
                notchedOutline: classes.textBoxRadius,
              },
              startAdornment: RenderIcon(selectedIndex),
              endAdornment: (
                <Button
                  className={classes.searchButton}
                  onClick={() => handleSearchClick()}
                >
                  <Search style={{ color: 'white' }} />
                </Button>
              ),
            }}
            inputProps={{ style: { fontSize: 20 } }} // font size of input text
          />
        </Grid>
      </Grid>

      <hr
        style={{
          border: '1px solid #d1d1d1',
          backgroundColor: '#d1d1d1',
          width: '100px',
          marginTop: '220px',
        }}
      />
      <Grid
        container
        direction='row'
        alignContent='center'
        alignItems='center'
        justify='center'
        spacing={4}
        style={{ marginTop: '5px' }}
      >
        <img
          src={require('../../assets/vt.png')}
          width={100}
          className={classes.siteImage}
        />

        <img
          src={require('../../assets/abuse.png')}
          width={100}
          className={classes.siteImage}
        />

        <img
          src={require('../../assets/meta.png')}
          width={100}
          className={classes.siteImage}
        />

        <img
          src={require('../../assets/ipvoid.png')}
          width={80}
          className={classes.siteImage}
        />

        <img
          src={require('../../assets/xforce.png')}
          width={120}
          className={classes.siteImage}
        />
      </Grid>

      <Backdrop open={isLoading} className={classes.backdrop}>
        {/* https://react-sticky.netlify.app/#/relative */}

        <ClimbingBoxLoader size={25} color={colPrimary} loading={isLoading} />
      </Backdrop>
    </div>
  );
};

Home.propTypes = {
  setAlert: PropTypes.func.isRequired,
  performSearch: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, performSearch })(Home);
