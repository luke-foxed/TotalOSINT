import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { colError, colSuccess } from '../../helpers/colors';

const useStyles = makeStyles(() => ({
  frame: {
    width: '150px',
    height: '150px',
    margin: '0 auto',
    borderRadius: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  circle: {
    width: '130px',
    height: '130px',
    borderRadius: '100px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const ScoreWidget = ({ score }) => {
  const classes = useStyles();

  let color = score.detections > 0 ? colError : colSuccess;

  return (
    <div style={{ margin: '20px' }}>
      <Paper
        className={classes.frame}
        style={{ backgroundColor: color }}
        elevation={3}
      >
        <div className={classes.circle}>
          <Typography
            style={{
              color: color,
              fontSize: '75px',
              fontFamily: 'Quicksand',
            }}
          >
            {score.detections}
          </Typography>

          <Typography style={{ fontSize: '20px', fontFamily: 'Quicksand' }}>
            /{score.engines}
          </Typography>
        </div>
      </Paper>
    </div>
  );
};
