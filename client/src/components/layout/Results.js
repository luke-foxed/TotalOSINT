import {
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { colPrimary } from '../../helpers/colors';

const useStyles = makeStyles(() => ({
  paper: {
    borderRadius: '15px',
    paddingTop: '10px',
    height: '300px',
    backgroundColor: colPrimary,
    alignItems: 'center',

    textAlign: 'center',
  },
}));

export const Results = ({ data }) => {
  const classes = useStyles();

  // Strip out basic details and render remaining items
  const RenderDetails = ({ values }) => {
    [
      'engines',
      'detections',
      'url',
      'risk',
      'abuseScore',
      'numberOfReports',
    ].forEach((key) => delete values[key]);

    return Object.entries(values).map(([label, value]) => (
      <Typography>
        {label}:{value}
      </Typography>
    ));
  };

  return (
    <div style={{ marginTop: '250px' }}>
      <Grid container spacing={2} justify='center'>
        {Object.entries(data).map(([key, value]) => (
          <Grid item xs={12} sm={4} lg={2}>
            <Paper className={classes.paper}>
              <div style={{ height: '40px' }}>
                <img
                  src={require(`../../assets/${key}.png`)}
                  width={140}
                  style={{ position: 'relative', top: '0' }}
                />
              </div>
              <Divider />

              <RenderDetails source={key} values={value} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
