import React from 'react';
import { Grid, Button, makeStyles } from '@material-ui/core';
import { Search, DeleteForever, TableChart } from '@material-ui/icons';
import { colError, colSecondary } from '../../helpers/colors';
import { exportAsCSV } from '../../helpers/generalHelpers';
import { IconHeader } from '../layout/IconHeader';
import { ResultCards } from '../layout/ResultCards';
import { Redirect, useLocation } from 'react-router-dom';
import { deleteResult } from '../../actions/user';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  actionButton: {
    margin: '15px',
    borderRadius: '15px',
    width: '200px',
    color: 'white',
    border: 'solid 2px white',
  },
}));

const SavedResult = ({ deleteResult }) => {
  const classes = useStyles();
  const locationData = useLocation();
  const result = locationData.state;

  if (result === undefined) {
    return <Redirect to='/profile' />;
  }

  const handleDeleteClick = (id) => {
    deleteResult(id);
    delete locationData.state;
  };

  return (
    <div
      style={{
        width: '80%',
        margin: 'auto',
        minHeight: '100vh',
        paddingTop: '20px',
      }}
    >
      <IconHeader
        text={`Results For '${result.searchValue}'`}
        icon={Search}
        color='white'
      />

      <ResultCards data={result} />

      <Grid
        container
        direction='row'
        justify='center'
        style={{ marginTop: '20px' }}
      >
        <Button
          variant='outlined'
          className={classes.actionButton}
          startIcon={<DeleteForever style={{ color: colError }} />}
          onClick={() => handleDeleteClick(result.id)}
        >
          Delete Results
        </Button>
        <Button
          variant='outlined'
          className={classes.actionButton}
          startIcon={<TableChart style={{ color: colSecondary }} />}
          onClick={() => exportAsCSV(result)}
        >
          Export To CSV
        </Button>
      </Grid>
    </div>
  );
};

SavedResult.propTypes = {
  deleteResult: PropTypes.func.isRequired,
};

export default connect(null, { deleteResult })(SavedResult);
