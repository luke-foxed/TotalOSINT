import React from 'react';
import Select from '@material-ui/core/Select';
import {
  fade,
  makeStyles,
  InputBase,
  Grid,
  Button,
  TextField,
  FormControl,
  MenuItem,
  Popper,
  Grow,
  Paper,
  MenuList,
  ClickAwayListener,
  IconButton,
} from '@material-ui/core';
import { Search, ArrowDropDown } from '@material-ui/icons/';

const useStyles = makeStyles(() => ({
  textBoxRadius: {
    borderRadius: '15px',
  },
}));

const options = ['Domain', 'Hash', 'IP'];

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
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

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <Grid
        container
        direction='row'
        alignItems='center'
        justify='center'
        spacing={1}
        style={{ minHeight: '75vh' }}
      >
        <Grid container item xs={3} sm={2} justify='center'>
          <Button
            ref={anchorRef}
            color='primary'
            size='medium'
            variant='contained'
            style={{ height: '55px', width: '110px', borderRadius: '15px' }}
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
          <TextField
            variant='outlined'
            style={{ width: '100%' }}
            InputProps={{
              classes: {
                notchedOutline: classes.textBoxRadius,
              },
              endAdornment: (
                <Button
                  style={{
                    backgroundColor: 'blue',
                    height: '100%',
                    borderRadius: '15px',
                    position: 'absolute',
                    right: '0',
                  }}
                >
                  <Search />
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

export default Home;
