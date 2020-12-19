import {
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  paper: {
    borderRadius: '15px',
    paddingTop: '10px',
    height: '300px',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

export const Results = ({ data }) => {
  const classes = useStyles();

  // Strip out basic details and render remaining items
  const RenderDetails = ({ values }) => {
    // needs to be changed so that additional details are stored under seperate json key
    let results = values;
    [
      'engines',
      'detections',
      'url',
      'risk',
      'abuse_score',
      'number_of_reports',
    ].forEach((key) => delete results[key]);

    return Object.entries(results).map(([label, value]) => (
      <Typography>
        {label}:{value}
      </Typography>
    ));
  };

  const RenderScore = ({ source, values }) => {
    if (source === 'xforce') {
      return <Typography>Risk: {values.risk}</Typography>;
    } else if (source === 'abuseip') {
      return <Typography>Confidence Of Abuse: {values.abuse_score}</Typography>;
    } else {
      return (
        <Typography>
          {values.detections} / {values.engines}
        </Typography>
      );
    }
  };

  return (
    <div style={{ marginTop: '250px' }}>
      <Grid container spacing={2} justify='center'>
        {Object.entries(data).map(([key, value]) => (
          <Grid item xs={12} sm={5} md={5} lg={4} xl={2}>
            <Paper className={classes.paper} elevation={2}>
              <div style={{ height: '40px' }}>
                <img
                  src={require(`../../assets/${key}_blue.png`)}
                  width={150}
                  style={{ position: 'relative', top: '0' }}
                />
              </div>
              <Divider />

              <RenderScore source={key} values={value} />
              <RenderDetails values={value} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
