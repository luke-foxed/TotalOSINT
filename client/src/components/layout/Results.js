import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React from 'react';
import { colPrimary, colSecondary } from '../../helpers/colors';
import { ScoreWidget } from './ScoreWidget';

const useStyles = makeStyles(() => ({
  frame: {
    borderRadius: '15px',
    padding: '5px',
    background:
      'linear-gradient(180deg, rgba(164,75,227,1) 10%, rgba(73,182,255,1) 90%);',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '15px',
    minHeight: '400px',
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

export const Results = ({ data }) => {
  const classes = useStyles();

  const RenderDetails = ({ values }) => {
    return Object.entries(values.details).map(([label, value]) => {
      if (label !== 'url') {
        return (
          <Typography>
            {label
              .replace('_', ' ')
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
              .join(' ')}
            :{' ' + value}
          </Typography>
        );
      }
    });
  };

  const RenderScore = ({ source, values }) => {
    switch (source) {
      case 'xforce':
        return <Typography>Risk: {values.risk}</Typography>;
      case 'abuseip':
        return (
          <Typography>Confidence Of Abuse: {values.abuse_score}</Typography>
        );
      case 'whois':
        return <Typography />;
      default:
        return (
          <Typography>
            {values.detections} / {values.engines}
          </Typography>
        );
    }
  };

  let test = {
    detections: '5',
    engines: '30',
  };

  return (
    <div style={{ marginTop: '250px' }}>
      <Grid container spacing={2} justify='center'>
        {Object.entries(data).map(([key, value]) => (
          <Grid item xs={12} sm={5} md={5} lg={4} xl={2}>
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
                {/* <RenderScore source={key} values={value} /> */}
                <ScoreWidget score={test} />

                <Accordion style={{ width: '100%' }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography>More Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <RenderDetails values={value} />
                  </AccordionDetails>
                </Accordion>

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
