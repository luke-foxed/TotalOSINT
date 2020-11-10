import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { performSearch } from '../../actions/search';
import { setAlert } from '../../actions/alert';
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

const Home = ({ setAlert, performSearch }) => {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [value, setValue] = useState('');

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
      let data = performSearch(value, options[selectedIndex].toLowerCase());
      console.log(data);
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
          margin: '90px',
          fontFamily: 'Yanone Kaffeesatz',
          color: 'white',
          fontSize: '50px',
        }}
      >
        ANY <b style={{ color: colPrimary }}>IP</b> ADDRESS, FILE{' '}
        <b style={{ color: colPrimary }}>HASH</b> OR{' '}
        <b style={{ color: colPrimary }}>DOMAIN</b>
      </Typography>
      <Grid
        container
        direction='row'
        alignItems='center'
        justify='center'
        spacing={0}
        style={{ minHeight: '10vh' }}
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
    </div>
  );
};

Home.propTypes = {
  setAlert: PropTypes.func.isRequired,
  performSearch: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, performSearch })(Home);
