import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { colPrimary } from '../../helpers/colors';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      loading ? (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
          }}
        >
          <ScaleLoader color={colPrimary} />
        </div>
      ) : isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to='/register' />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
