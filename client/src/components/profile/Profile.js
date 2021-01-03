import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Grid,
} from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  ArrowDownward,
  ArrowUpward,
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
  const history = useHistory();
  const [userResults, setUserResults] = useState(user.savedResults);
  const [sortDirection, setSortDirection] = useState('asc');

  const sorted = useMemo(() => {
    let sortedResults = userResults
      .slice()
      .sort((a, b) => new Date(b.searchDate) - new Date(a.searchDate));
    if (sortDirection === 'asc') {
      return sortedResults;
    } else {
      return sortedResults.reverse();
    }
  }, [userResults, sortDirection]);

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

  const handleViewClick = (result) => {
    history.push({
      pathname: `/saved/${result.searchValue}`,
      state: result,
    });
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
                <Grid container direction='row' justify='center'>
                  Search Date
                  {sortDirection === 'desc' ? (
                    <IconButton
                      size='small'
                      style={{ marginLeft: '10px', color: 'white' }}
                      onClick={() => setSortDirection('asc')}
                    >
                      <ArrowUpward />
                    </IconButton>
                  ) : (
                    <IconButton
                      size='small'
                      style={{ marginLeft: '10px', color: 'white' }}
                      onClick={() => setSortDirection('desc')}
                    >
                      <ArrowDownward />
                    </IconButton>
                  )}
                </Grid>
              </TableCell>
              <TableCell align='center' className={classes.tableHeaderCell}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((result, index) => (
              <TableRow key={index}>
                <TableCell align='center'>
                  <RenderIcon type={result.searchType} />
                </TableCell>
                <TableCell align='center'>{result.searchValue}</TableCell>
                <TableCell align='center'>{result.searchDate}</TableCell>
                <TableCell align='center'>
                  <IconButton
                    style={{ color: colSecondary }}
                    onClick={() => handleViewClick(result)}
                  >
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
