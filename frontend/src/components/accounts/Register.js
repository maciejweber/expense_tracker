import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const styles = (theme) => ({
  paper: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: '10px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '10px',
  },
  submit: {
    margin: '10px 0px',
  },
});


export class Register extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    usernameError:'',
    passwordError:'',
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const err = this.validate();
    const { username, password} = this.state;
    if(!err){
        const newUser = {
          username,
          password
        }
        this.props.register(newUser);
        this.setState({
            username: '',
            password: '',
            password2: '',
        })
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  validate = (e) => {
      let isError = false;
      const errors = {
        usernameError: '',
        passwordError: ''
      };
      const {username, password, password2} = this.state;

      if(username.length < 5){
          isError = true;
          errors.usernameError = 'Login should be at least 5 chatacters long'
      }

      const passwordRegex = /(?=.*[0-9])/;
      if(!password){
          isError = true;
          errors.passwordError = 'Password is required'
      } else if (password.length < 6){
        isError = true;
        errors.passwordError = 'Password should be at least 6 chatacters long'
      } else if (!passwordRegex.test(password)){
        isError = true;
        errors.passwordError = 'Invalid password. Must contain one number.'
      } else if (password !== password2) {
        isError = true;
        errors.passwordError = 'Passwords do not match'
      }


      this.setState({
        ...this.state,
        ...errors
      });

      return isError
  
  }

  render() {
    const { username, password, password2, usernameError, passwordError } = this.state;
    const {classes, alerts} = this.props;
    return (
          <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              {alerts.type === "success" ? 
              <Alert variant="outlined" severity={alerts.type}>
                <AlertTitle>{alerts.message}</AlertTitle>
                <Link href="/login" color="inherit">
                Click here to login
                </Link>
              </Alert> : ''
              }
              {alerts.type === "error" ? 
              <Alert variant="outlined" severity={alerts.type}>
                <AlertTitle>Error</AlertTitle>
                {alerts.message}
              </Alert> : ''
              }
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="email"
                onChange={this.onChange}
                value={username}
                autoFocus
                helperText={usernameError}
                error={!!usernameError}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={this.onChange}
                value={password}
                autoComplete="current-password"
                helperText={passwordError}
                error={!!passwordError}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Confirm password"
                type="password"
                id="password2"
                onChange={this.onChange}
                value={password2}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Do you have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
  alerts: state.alerts
});

export default connect(mapStateToProps, { register })(withStyles(styles)(Register));