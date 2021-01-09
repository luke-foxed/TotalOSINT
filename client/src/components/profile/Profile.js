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
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  TextField,
  Collapse,
} from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { colError, colPrimary, colSecondary } from '../../helpers/colors';
import {
  deleteAllResults,
  deleteResult,
  deleteUser,
  updateAvatar,
} from '../../actions/user';
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
  TableChart,
  Visibility,
} from '@material-ui/icons';
import { IconHeader } from '../layout/IconHeader';
import { isMobile } from 'react-device-detect';
import { PromptDialog } from '../layout/PromptDialog';

const useStyles = makeStyles(() => ({
  profileView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '0 auto',
  },
  resultView: {
    width: isMobile ? '100%' : '75%',
    margin: '0 auto',
  },
  paper: {
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
    fontSize: '16px',
  },
  checkboxLabel: {
    fontSize: '14px',
    fontFamily: 'Quicksand',
  },
  radioButton: {
    color: colSecondary,
    padding: '3px',
  },
  actionButton: {
    borderRadius: '15px',
    width: '200px',
    color: 'white',
    border: 'solid 2px white',
  },
}));

const Profile = ({
  user,
  deleteResult,
  deleteAllResults,
  deleteUser,
  updateAvatar,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [userResults, setUserResults] = useState(user.savedResults);

  const [sortDirection, setSortDirection] = useState('asc');
  const [sortBy, setSortBy] = useState('none');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tempAvatar, setTempAvatar] = useState({
    value: '',
    isOpen: false,
  });
  const [dialogParams, setDialogParams] = useState({
    open: false,
    title: '',
    message: '',
    callback: () => {},
  });

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

  const handleChangeAvatarClick = () => {
    setTempAvatar({ isOpen: !tempAvatar.isOpen });
  };

  const handleAvatarSaveClick = () => {
    updateAvatar(tempAvatar.value);
    setTempAvatar({ isOpen: false });
  };

  const handleDeleteAccountClick = () => {
    setDialogParams({
      open: true,
      title: 'Delete Account',
      message: <Typography>Are you sure? This cannot be undone!</Typography>,
      callback: () => {
        deleteUser();
      },
    });
  };

  const handleDeleteAllResultsClick = () => {
    setDialogParams({
      open: true,
      title: 'Delete All Results',
      message: (
        <Typography>
          Are you sure? All below results will be deleted!
        </Typography>
      ),
      callback: () => {
        deleteAllResults();
        setUserResults([]);
      },
    });
  };

  const handleDialogClose = () => {
    setDialogParams({ ...dialogParams, open: false });
  };

  const handleViewClick = (result) => {
    let base64Result = btoa(result.searchValue);
    history.push({
      pathname: `/saved/${base64Result}`,
      state: result,
    });
  };

  const handleDeleteResultClick = (id) => {
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

  const handleRadioChange = (event) => {
    let sortType = event.target.value;
    let sortedResults =
      sortType === 'none'
        ? user.savedResults
        : user.savedResults.filter((item) => item.searchType === sortType);
    setSortBy(event.target.value);
    setUserResults(sortedResults);
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
    <div style={{ minHeight: '75vh' }}>
      <div className={classes.profileView} style={{ width: '75%' }}>
        <IconHeader text='My Profile ' icon={AccountCircle} color='white' />

        <img
          src={user.avatar}
          height={180}
          style={{ borderRadius: '200px', margin: '20px' }}
        />
        <Typography
          style={{ fontSize: '20px', color: 'white', fontFamily: 'Quicksand' }}
        >
          {user.username}
        </Typography>
        <Typography
          style={{ fontSize: '10px', color: 'grey', fontFamily: 'Quicksand' }}
        >
          Member Since{' '}
          {new Date(user.dateCreated).toLocaleString('default', {
            month: 'long',
          })}
          , {new Date(user.dateCreated).getFullYear()}
        </Typography>
        <div
          style={{
            width: '50%',
            borderBottom: '1px solid #474747',
            margin: '10px',
          }}
        />

        <Grid
          container
          justify='center'
          style={{ width: isMobile ? '100%' : '60%' }}
          spacing={2}
        >
          <Grid item md={4} xs={12} style={{ textAlign: 'center' }}>
            <Button
              className={classes.actionButton}
              variant='outlined'
              onClick={() => handleChangeAvatarClick()}
            >
              Change Avatar
            </Button>
          </Grid>
          <Grid item md={4} xs={12} style={{ textAlign: 'center' }}>
            <Button
              className={classes.actionButton}
              variant='outlined'
              onClick={() => handleDeleteAllResultsClick()}
            >
              Delete All Saves
            </Button>
          </Grid>
          <Grid item md={4} xs={12} style={{ textAlign: 'center' }}>
            <Button
              className={classes.actionButton}
              onClick={() => handleDeleteAccountClick()}
              variant='outlined'
            >
              Delete Account
            </Button>
          </Grid>

          <Collapse
            in={tempAvatar.isOpen}
            style={{ width: '100%', margin: '20px' }}
          >
            <Grid item md={12} xs={12} style={{ textAlign: 'center' }}>
              <Paper
                style={{
                  borderRadius: '15px',
                  padding: '10px',
                  borderBottom: '4px solid ' + colPrimary,
                }}
              >
                <Typography
                  style={{
                    fontFamily: 'Quicksand',
                    padding: '10px',
                    fontSize: '20px',
                  }}
                >
                  Enter URL
                </Typography>
                <TextField
                  variant='outlined'
                  size='small'
                  fullWidth
                  onChange={(e) =>
                    setTempAvatar({ ...tempAvatar, value: e.target.value })
                  }
                />
                <Button
                  style={{ margin: '5px', color: colSecondary }}
                  onClick={() => handleAvatarSaveClick()}
                >
                  Save
                </Button>
              </Paper>
            </Grid>
          </Collapse>
        </Grid>
      </div>
      <div className={classes.resultView}>
        <br />
        <br />
        <IconHeader text='Saved Results ' icon={TableChart} color='white' />

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
                        <ArrowUpward fontSize='small' />
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
                      onClick={() => handleDeleteResultClick(result.id)}
                    >
                      <DeleteForever />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Grid container direction='row'>
            <Grid item md={1} xs={0} />
            <Grid
              container
              item
              xs={12}
              md={5}
              justify={isMobile ? 'center' : 'flex-start'}
              alignItems='center'
            >
              <Typography style={{ paddingRight: '20px', fontSize: '14px' }}>
                Filter By:
              </Typography>
              <RadioGroup row onChange={handleRadioChange} value={sortBy}>
                <FormControlLabel
                  classes={{
                    label: classes.checkboxLabel,
                  }}
                  value='none'
                  control={
                    <Radio style={{ color: colSecondary, padding: '3px' }} />
                  }
                  label='None'
                />
                <FormControlLabel
                  classes={{
                    label: classes.checkboxLabel,
                  }}
                  value='ip'
                  control={
                    <Radio style={{ color: colSecondary, padding: '3px' }} />
                  }
                  label='IP'
                />
                <FormControlLabel
                  classes={{
                    label: classes.checkboxLabel,
                  }}
                  value='hash'
                  control={
                    <Radio style={{ color: colSecondary, padding: '3px' }} />
                  }
                  label='Hash'
                />
                <FormControlLabel
                  classes={{
                    label: classes.checkboxLabel,
                  }}
                  value='domain'
                  control={
                    <Radio style={{ color: colSecondary, padding: '3px' }} />
                  }
                  label='Domain'
                />
              </RadioGroup>
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={5}
              justify={isMobile ? 'center' : 'flex-end'}
            >
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage='Rows Per Page'
                component='div'
                count={sorted.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Grid>
            <Grid item xs={0} md={1} />
          </Grid>
        </Paper>
      </div>

      <PromptDialog
        open={dialogParams.open}
        title={dialogParams.title}
        message={dialogParams.message}
        onConfirm={dialogParams.callback}
        handleClose={handleDialogClose}
      />
    </div>
  );
};

Profile.propTypes = {
  deleteResult: PropTypes.func.isRequired,
  deleteAllResults: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateAvatar: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  deleteResult,
  deleteAllResults,
  deleteUser,
  updateAvatar,
})(Profile);
