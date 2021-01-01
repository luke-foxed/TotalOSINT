import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

import { colSecondary, colPrimary } from '../../helpers/colors';

const useStyles = makeStyles({
  paperHeader: {
    fontFamily: 'Quicksand',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export const IconHeader = ({ icon, text, color }) => {
  const classes = useStyles();
  const Icon = icon;
  return (
    <div className={classes.paper}>
      <Grid container direction='row' alignItems='center' justify='center'>
        <Grid item>
          <Icon
            fontSize='large'
            style={{
              height: 40,
              width: 40,
              color: colPrimary,
              paddingRight: '10px',
            }}
          />
        </Grid>
        <Grid item>
          <Typography
            variant={'h4'}
            className={classes.paperHeader}
            style={{ color: color }}
          >
            {text}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
