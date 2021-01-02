import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import {
  colError,
  colPrimary,
  colSecondary,
  colSuccess,
} from '../../helpers/colors';
import PropTypes from 'prop-types';
import {
  AccountCircle,
  DeleteForever,
  Description,
  Language,
  PinDrop,
  Visibility,
} from '@material-ui/icons';
import { IconHeader } from '../layout/IconHeader';
import { setAlert } from '../../actions/alert';

const useStyles = makeStyles(() => ({
  frame: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '75%',
    margin: '0 auto',
  },
  paper: {
    width: '100%',
    overflowX: 'auto',
    marginTop: '20px',
    borderRadius: '15px',
  },
  table: {
    display: 'block',
    width: '100%',
    overflowX: 'auto',
  },
  tableHeaderCell: {
    fontFamily: 'Quicksand',
    color: 'white',
    fontSize: '20px',
  },
}));

const Profile = ({ user, setAlert }) => {
  const classes = useStyles();

  const RenderIcon = ({ type }) => {
    switch (type) {
      case 'domain':
        return <Language fontSize='large' style={{ color: colPrimary }} />;
      case 'hash':
        return <Description fontSize='large' style={{ color: colPrimary }} />;
      case 'ip':
        return <PinDrop fontSize='large' style={{ color: colPrimary }} />;
    }
  };

  return (
    <div className={classes.frame}>
      <IconHeader text='My Profile ' icon={AccountCircle} color='white' />

      <Paper className={classes.paper}>
        <Table style={{ minWidth: 700 }}>
          <TableHead style={{ backgroundColor: colPrimary }}>
            <TableRow>
              <TableCell />
              <TableCell align='center' className={classes.tableHeaderCell}>
                Search Value
              </TableCell>
              <TableCell align='center' className={classes.tableHeaderCell}>
                Search Date
              </TableCell>
              <TableCell align='center' className={classes.tableHeaderCell}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.savedResults.map((result) => (
              <TableRow>
                <TableCell align='center'>
                  <RenderIcon type={result.searchType} />
                </TableCell>
                <TableCell align='center'>{result.searchValue}</TableCell>
                <TableCell align='center'>{result.searchDate}</TableCell>
                <TableCell align='center'>
                  <IconButton style={{ color: colSecondary }}>
                    <Visibility />
                  </IconButton>
                  <IconButton style={{ color: colError }}>
                    <DeleteForever />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

Profile.propTypes = {
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { setAlert })(Profile);
