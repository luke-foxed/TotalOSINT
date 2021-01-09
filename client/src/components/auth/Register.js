import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import {
  Button,
  FormGroup,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  withStyles,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { Visibility, VisibilityOff, PersonAdd } from '@material-ui/icons';
import { colPrimary } from '../../helpers/colors';
import { register } from '../../actions/auth';
import { IconHeader } from '../layout/IconHeader';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: colPrimary,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: colPrimary,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: colPrimary,
      },
      '&.Mui-focused fieldset': {
        borderColor: colPrimary,
      },
    },
  },
})(TextField);

const useStyles = makeStyles(() => ({
  frame: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '75vh',
  },
  paper: {
    padding: '60px',
    maxWidth: '500px',
    borderRadius: '15px',
  },
  registerButton: {
    background:
      'linear-gradient(118deg, rgba(164,75,227,1) 0%, rgba(73,182,255,1) 100%)',
    color: 'white',
    marginTop: '15px',
  },
}));

const Register = ({ setAlert, isAuthenticated, register }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    showPassword: false,
  });

  const { username, email, password, confirm_password } = formData;

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const submitRegister = () => {
    if (email === '' || username === '' || password === '') {
      setAlert('Please Fill Out All Fields', 'error');
    } else if (password !== confirm_password) {
      setAlert('Passwords Do Not Match', 'error');
    } else {
      register({ username, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className={classes.frame}>
      <Paper elevation={3} className={classes.paper}>
        <IconHeader text='Create An Account' icon={PersonAdd} color='black' />

        <FormGroup onSubmit={(e) => e.preventDefault()}>
          <CssTextField
            margin='normal'
            required
            fullWidth
            onInput={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            id='username'
            label='Username'
            name='username'
            autoFocus
            variant='outlined'
          />
          <CssTextField
            margin='normal'
            required
            fullWidth
            onInput={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            id='email'
            label='Email Address'
            name='email'
            autoFocus
            variant='outlined'
          />
          <CssTextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type={formData.showPassword ? 'text' : 'password'}
            id='password'
            onInput={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            variant='outlined'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                  >
                    {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <CssTextField
            margin='normal'
            required
            fullWidth
            name='confirm_password'
            label='Confirm Password'
            type={formData.showPassword ? 'text' : 'password'}
            id='confirm_password'
            onInput={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            variant='outlined'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                  >
                    {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type='submit'
            onClick={submitRegister}
            fullWidth
            variant='contained'
            className={classes.registerButton}
          >
            Register
          </Button>
        </FormGroup>
      </Paper>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
