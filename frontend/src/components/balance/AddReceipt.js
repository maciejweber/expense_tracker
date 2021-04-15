import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {getFriends} from '../../actions/friends';
import { addReceipt } from '../../actions/receipts';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const styles = (theme) => ({
  container: {
    margin: '20px 0px'
  },
  input: {
    margin: '5px 0px',
    width: '100%',
  },
  submit: {
    margin: '10px 0px 0px 0px'
  }
});

class AddReceipt extends Component {
  state = {
    info: '',
    infoError: false,
    value: '',
    valueError: false,
    users: [],
    usersError: false

  }
  static propTypes = {
    friends: PropTypes.array.isRequired,
    getFriends: PropTypes.func.isRequired,
    addReceipt: PropTypes.func.isRequired,
  }

  componentDidMount(){
    this.props.getFriends();  
}


  handleChange = (event) => {
    this.setState({users: event.target.value});
  };

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value })
  };

  validate = (e) => {
    let isError = false;
    const errors = {
      infoError: false,
      valueError: false,
      usersError: false
    };

    if(this.state.info < 5) {
      isError = true;
      errors.infoError = true;
    }

    if(!this.state.value){
      isError = true;
      errors.valueError = true;
    }

    if(isNaN(this.state.value) === true){
      isError = true;
      errors.valueError = true;
    }

    if(this.state.users.length === 0){
      isError = true;
      errors.usersError = true;
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { info, value } = this.state;
    const users = this.state.users.map(({ id }) => id)
    const receipt = { info, value, users };
    const err = this.validate();
    if (!err){
      this.props.addReceipt(JSON.stringify(receipt));
      this.setState({
        info: '',
        value: '',
        users: []
      });
    }
  }

    render() {
      const { friends } = this.props;
      const { classes } = this.props;
      const { info, value, users } = this.state;
      return (
          <div className={classes.container}>
            <h3>Add Receipt { value && isNaN(this.state.value) === false && this.state.users.length !== 0 ? '(To return '+(value * users.length)+' PLN)' : '' }</h3>
            <form onSubmit={this.onSubmit}>
              <TextField
                className={classes.input}
                fullWidth
                variant="outlined"
                id="info"
                name="info"
                label="Title"
                value={info}
                onChange={this.onChange}
                error={this.state.infoError}
              />
              <TextField
                className={classes.input}
                fullWidth
                variant="outlined"
                name="value"
                label="Value"
                type="value"
                id="value"
                value={value}
                onChange={this.onChange}
                error={this.state.valueError}
              />

              <FormControl variant="outlined" className={classes.input} error={this.state.usersError} disabled={this.props.friends.length === 0}>
              <InputLabel id="demo-mutiple-checkbox-label">
              {this.props.friends.length !== 0 ?
              'Users' : 'You have to add friends'
              }
              </InputLabel>
                <Select
                multiple
                value={users}
                onChange={this.handleChange}
                MenuProps={MenuProps}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip key={value.id} label={value.username} className={classes.chip} />
                      ))}
                  </div>
                )}
                >
                
                {friends.map((friend) => (
                    <MenuItem key={friend.id} value={friend}>
                      {friend.username}
                    </MenuItem>
                ))
              }
                </Select>
                
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add Receipt
              </Button>
            </form>
          </div>
      );
    }
}

AddReceipt.propTypes = {
    classes: PropTypes.object.isRequired
  }

const mapStateToProps = (state) => ({
  friends: state.friends.friends
})
  

export default connect(mapStateToProps, { getFriends, addReceipt })(withStyles(styles)(AddReceipt));
