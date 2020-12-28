import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Grid,
  makeStyles,
  Paper,
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
    minHeight: '440px',
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
}));

export const ResultCards = ({ data }) => {
  const classes = useStyles();

  const RenderDetails = ({ values }) => {
    return Object.entries(values.details).map(([key, value]) => {
      if (key !== 'url') {
        let formattedLabel = key
          .replace('_', ' ')
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.substring(1));

        return (
          <div className={classes.chipContainer}>
            <Chip style={{ margin: '2px' }} label={formattedLabel} />
            <Chip label={value} variant='outlined' />
          </div>
        );
      }
    });
  };

  const RenderScore = ({ source, values }) => {
    switch (source) {
      case 'xforce':
        return (
          <Typography style={{ fontFamily: 'Quicksand' }}>
            Risk:
            <Typography
              style={{
                fontSize: '80px',
                fontFamily: 'Quicksand',
                color: values.abuse_score !== '0%' ? colError : colSuccess,
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
            }}
          >
            WhoIs Information
          </Typography>
        );
      default:
        return <ScoreWidget score={values} />;
    }
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <Grid container spacing={2} justify='center'>
        {Object.entries(data).map(([key, value]) => (
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
                    style={{ position: 'relative', top: '0', padding: '5px' }}
                  />
                </div>

                <RenderScore source={key} values={value} />

                <RenderDetails values={value} />

                <div className={classes.sticky}>
                  <Button
                    style={{
                      backgroundColor: colSecondary,
                      borderRadius: 0,
                      color: 'white',
                    }}
                  >
                    Visit Link
                  </Button>
                </div>
              </Paper>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
