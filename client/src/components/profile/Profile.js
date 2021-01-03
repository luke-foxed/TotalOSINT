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
  TablePagination,
  Chip,
} from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { colError, colPrimary, colSecondary } from '../../helpers/colors';
import { deleteResult } from '../../actions/user';
import PropTypes from 'prop-types';
import {
  AccountCircle,
  ArrowDownward,
  ArrowUpward,
  DateRangeOutlined,
  DeleteForever,
  Description,
  Language,
  LocalOfferOutlined,
  PinDrop,
  Visibility,
} from '@material-ui/icons';
import { IconHeader } from '../layout/IconHeader';

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

const Profile = ({ user, deleteResult }) => {
  const classes = useStyles();
  const history = useHistory();
  const [userResults, setUserResults] = useState(user.savedResults);
  const [sortDirection, setSortDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleViewClick = (result) => {
    let base64Result = btoa(result.searchValue);
    history.push({
      pathname: `/saved/${base64Result}`,
      state: result,
    });
  };

  const handleDeleteClick = (id) => {
    setUserResults(userResults.filter((item) => item.id !== id));
    deleteResult(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
              <TableCell colSpan={1} />
              <TableCell
                align='center'
                className={classes.tableHeaderCell}
                colSpan={5}
                style={{ width: '350px' }}
              >
                Search Value
              </TableCell>
              <TableCell
                align='center'
                className={classes.tableHeaderCell}
                colSpan={3}
              >
                <Grid
                  container
                  direction='row'
                  justify='center'
                  alignContent='center'
                  alignItems='center'
                >
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
              <TableCell
                align='center'
                className={classes.tableHeaderCell}
                colSpan={3}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? sorted.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : sorted
            ).map((result, index) => (
              <TableRow key={index}>
                <TableCell align='center' colSpan={1}>
                  <RenderIcon type={result.searchType} />
                </TableCell>
                <TableCell
                  align='center'
                  colSpan={5}
                  style={{ width: '350px' }}
                >
                  <Chip
                    icon={<LocalOfferOutlined fontSize='small' />}
                    label={result.searchValue}
                    style={{ fontSize: '14px' }}
                  />
                </TableCell>
                <TableCell align='center' colSpan={3}>
                  <Chip
                    icon={<DateRangeOutlined fontSize='small' />}
                    label={result.searchDate}
                    style={{ fontSize: '14px' }}
                  />
                </TableCell>
                <TableCell align='center' colSpan={3}>
                  <IconButton
                    style={{ color: colSecondary }}
                    onClick={() => handleViewClick(result)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    style={{ color: colError }}
                    onClick={() => handleDeleteClick(result.id)}
                  >
                    <DeleteForever />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={sorted.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

Profile.propTypes = {
  deleteResult: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { deleteResult })(Profile);
