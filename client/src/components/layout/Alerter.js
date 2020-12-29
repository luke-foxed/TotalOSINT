import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { colError, colSuccess } from '../../helpers/colors';

const Alerter = ({ alerts }) =>
  alert !== null &&
  alerts.map((alert) => (
    <Snackbar
      key={alert.id}
      open={true}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        elevation={6}
        variant='filled'
        severity={alert.alertType}
        style={
          alert.alertType === 'success'
            ? { backgroundColor: colSuccess }
            : { backgroundColor: colError }
        }
        key={alert.id}
      >
        {alert.msg}
      </Alert>
    </Snackbar>
  ));

Alerter.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alerter);
