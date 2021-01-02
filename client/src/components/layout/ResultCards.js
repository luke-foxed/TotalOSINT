import {
  Button,
  Chip,
  Grid,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React from 'react';
import {
  colError,
  colPrimary,
  colSecondary,
  colSuccess,
} from '../../helpers/colors';
import { ScoreWidget } from './ScoreWidget';

const useStyles = makeStyles(() => ({
  frame: {
    borderRadius: '15px',
    padding: '5px',
    background:
      'linear-gradient(180deg, rgba(164,75,227,1) 10%, rgba(73,182,255,1) 90%);',
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '300px',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '15px',
    minHeight: '450px',
    maxWidth: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
  sticky: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    width: '100%',
  },
  link: {
    width: '100%',
    backgroundColor: colSecondary,
    textDecoration: 'none',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      borderRadius: '15px',
      width: '150px',
      marginBottom: '5px',
    },
  },
}));

export const ResultCards = ({ data }) => {
  const classes = useStyles();

  const RenderDetails = ({ values }) => {
    if (values.error) {
      return null;
    } else {
      return Object.entries(values.details).map(([key, value]) => {
        if (key !== 'url') {
          let formattedLabel = key
            .replace('_', ' ')
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
            .join(' ');

          return (
            <div className={classes.chipContainer}>
              <Chip style={{ margin: '2px' }} label={formattedLabel} />
              {/* z-index and pointer-events to fix flickering bug */}
              <Tooltip
                style={{ pointerEvents: 'none', zIndex: 9999 }}
                title={value}
              >
                <Chip
                  style={{ maxWidth: '190px', margin: '2px' }}
                  label={value}
                  variant='outlined'
                />
              </Tooltip>
            </div>
          );
        }
      });
    }
  };

  const RenderScore = ({ source, values }) => {
    if (values.error) {
      return (
        <Typography
          style={{
            fontSize: '30px',
            fontFamily: 'Quicksand',
          }}
        >
          {values.error}
        </Typography>
      );
    } else {
      switch (source) {
        case 'xforce':
          return (
            <Typography style={{ fontFamily: 'Quicksand' }}>
              Risk:
              <Typography
                style={{
                  fontSize: '80px',
                  fontFamily: 'Quicksand',
                  color: values.risk === '1' ? colSuccess : colError,
                }}
              >
                {values.risk}
              </Typography>
            </Typography>
          );
        case 'abuseip':
          return (
            <Typography style={{ fontFamily: 'Quicksand' }}>
              Confidence Of Abuse:
              <Typography
                style={{
                  fontSize: '80px',
                  fontFamily: 'Quicksand',
                  color: values.abuse_score !== '0%' ? colError : colSuccess,
                }}
              >
                {values.abuse_score}
              </Typography>
            </Typography>
          );
        case 'whois':
          return (
            <Typography
              style={{
                fontSize: '30px',
                fontFamily: 'Quicksand',
                paddingBottom: '20px',
              }}
            >
              WhoIs Information
            </Typography>
          );
        default:
          return <ScoreWidget score={values} />;
      }
    }
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <Grid container spacing={2} justify='center'>
        {Object.entries(data).map(([key, value]) => {
          if (
            key !== 'searchValue' &&
            key !== 'searchType' &&
            key !== 'searchDate'
          ) {
            return (
              <Grid item xs={12} sm={5} md={5} lg={4} xl={4}>
                <div className={classes.frame}>
                  <Paper className={classes.paper} elevation={0}>
                    <div
                      style={{
                        backgroundColor: colPrimary,
                        marginBottom: '10px',
                        width: '100%',
                      }}
                    >
                      <img
                        src={require(`../../assets/${key}.png`)}
                        width={160}
                        style={{
                          position: 'relative',
                          top: '0',
                          padding: '5px',
                        }}
                      />
                    </div>

                    <RenderScore source={key} values={value} />

                    <RenderDetails values={value} />

                    <div className={classes.sticky}>
                      {value.details && value.details.url && (
                        <a
                          href={value.details.url}
                          target='_blank'
                          className={classes.link}
                        >
                          <Button
                            style={{
                              backgroundColor: colSecondary,
                              borderRadius: 0,
                              color: 'white',
                            }}
                          >
                            Visit Link
                          </Button>
                        </a>
                      )}
                    </div>
                  </Paper>
                </div>
              </Grid>
            );
          }
        })}
      </Grid>
    </div>
  );
};
