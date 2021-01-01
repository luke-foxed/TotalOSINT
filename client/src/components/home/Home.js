import React, { useEffect, useRef, useState } from 'react';
import { scroller } from 'react-scroll';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { performSearch } from '../../actions/search';
import { saveResults } from '../../actions/user';
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
  Save,
  TableChart,
} from '@material-ui/icons/';
import { checkInput } from '../../helpers/regexHelpers';
import { colPrimary, colSecondary } from '../../helpers/colors';
import { ResultCards } from '../layout/ResultCards';
import { exportAsCSV } from '../../helpers/generalHelpers';
import { IconHeader } from '../layout/IconHeader';

/////////////////////

const sampleIP = {
  whois: {
    details: {
      organization: 'Google LLC',
      country: 'UNITED STATES',
      domain_name: 'google.com',
      registrar_name: 'MarkMonitor, Inc.',
      whois_server: 'whois.markmonitor.com',
      created_date: '1997-09-15 07:00:00 UTC',
      domain_ext: '.com',
    },
  },
  virustotal: {
    detections: '5',
    engines: '86',
    details: {
      url: 'https://www.virustotal.com/gui/ip-address/89.248.167.164/detection',
      range: '89.248.167.164 (89.248.160.0/21)',
      owner: 'AS 202425 ( IP Volume inc )',
      country: 'NL',
    },
  },
  metadefender: {
    detections: '2',
    engines: '7',
    details: {
      url:
        'https://metadefender.opswat.com/results/ip/ODkuMjQ4LjE2Ny4xNjQ=/overview?lang=en',
    },
  },
  abuseip: {
    abuse_score: '92%',
    details: {
      url: 'https://www.abuseipdb.com/check/89.248.167.164',
      ISP: 'Incrediserve Ltd',
      domain: 'incrediserve.net',
      country: ' Seychelles',
      number_of_reports: '148',
    },
  },
  ipvoid: {
    detections: '7',
    engines: '115',
    details: {
      url: 'https://www.ipvoid.com/ip-blacklist-check/',
      reverse_DNS: 'Unknown',
      ASN_ownser: 'IP Volume inc',
      ISP: 'IP Volume inc',
      country: ' (NL) Netherlands',
    },
  },
  xforce: {
    risk: '10',
    details: {
      url: 'https://exchange.xforce.ibmcloud.com/ip/89.248.167.164',
      category: 'Scanning IPs(100%)',
    },
  },
};

//////////////////////

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
  inputIcon: {
    color: 'white',
    paddingRight: '10px',
  },
  tooltip: {
    color: colSecondary,
    fontFamily: 'Quicksand',
    fontSize: '12px',
    marginTop: '10px',
  },
  actionButton: {
    margin: '15px',
    borderRadius: '15px',
    width: '200px',
    color: 'white',
    border: 'solid 2px white',
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

const options = ['Domain', 'Hash', 'IP'];
const headerValues = ['FILE HASH', 'IP ADDRESS', 'DOMAIN'];

const Home = ({ setAlert, performSearch, saveResults }) => {
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
        value.trim(),
        options[selectedIndex].toLowerCase()
      );
      setSearchResults(response);
      setIsLoading(false);
      scroller.scrollTo('results', {
        duration: 1000,
        smooth: true,
        offset: 150,
      });
    }
  };

  const RenderTooltip = ({ index }) => {
    switch (index) {
      case 0:
        return (
          <Typography className={classes.tooltip}>
            <b>Note:</b> Only base domains are supported, not full URLs
          </Typography>
        );
      case 1:
        return (
          <Typography className={classes.tooltip}>
            <b>Note:</b> Hashes supported include SHA1, SHA256 and MD5
          </Typography>
        );
      case 2:
        return (
          <Typography className={classes.tooltip}>
            <b>Note:</b> Please provide only public IPV4 addresses
          </Typography>
        );
    }
  };

  const RenderIcon = (index) => {
    switch (index) {
      case 0:
        return (
          <InputAdornment>
            <Language className={classes.inputIcon} />
            <i style={{ paddingRight: '5px', color: colPrimary }}>www.</i>
          </InputAdornment>
        );
      case 1:
        return <Description className={classes.inputIcon} />;
      case 2:
        return <PinDrop className={classes.inputIcon} />;
    }
  };

  return (
    <div>
      <div
        className='home'
        style={{
          width: '75%',
          margin: 'auto',
          maxHeight: `100vh`,
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
                            onClick={(event) =>
                              handleMenuItemClick(event, index)
                            }
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
          <RenderTooltip index={selectedIndex} />
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
            src={require('../../assets/virustotal.png')}
            width={100}
            className={classes.siteImage}
          />

          <img
            src={require('../../assets/abuseip.png')}
            width={100}
            className={classes.siteImage}
          />

          <img
            src={require('../../assets/metadefender.png')}
            width={100}
            className={classes.siteImage}
          />

          <img
            src={require('../../assets/ipvoid.png')}
            width={100}
            className={classes.siteImage}
          />

          <img
            src={require('../../assets/xforce.png')}
            width={120}
            className={classes.siteImage}
          />
        </Grid>

        <Backdrop open={isLoading} className={classes.backdrop}>
          <ScaleLoader size={35} color={colPrimary} loading={isLoading} />
        </Backdrop>
      </div>

      {Object.keys(searchResults).length !== 0 && !isLoading && (
        <div
          className='results'
          style={{
            width: '80%',
            margin: 'auto',
            height: '100vh',
          }}
        >
          <div style={{ paddingTop: '180px' }} />

          <IconHeader
            text={`You Searched ${value}`}
            icon={Search}
            color='white'
          />

          <ResultCards data={searchResults} />

          <Grid
            container
            direction='row'
            justify='center'
            style={{ marginTop: '20px' }}
          >
            <Button
              variant='outlined'
              className={classes.actionButton}
              startIcon={<Save style={{ color: colPrimary }} />}
              onClick={() => saveResults(searchResults)}
            >
              Save Results
            </Button>
            <Button
              variant='outlined'
              className={classes.actionButton}
              startIcon={<TableChart style={{ color: colSecondary }} />}
              onClick={() => exportAsCSV(sampleIP)}
            >
              Export To CSV
            </Button>
          </Grid>
        </div>
      )}
    </div>
  );
};

Home.propTypes = {
  setAlert: PropTypes.func.isRequired,
  performSearch: PropTypes.func.isRequired,
  saveResults: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, performSearch, saveResults })(Home);
