import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchUser, sendRequest } from '../../actions/search';
import User from './User';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

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

class Search extends Component {
    state = {
        username: ""
    }

    static propTypes = {
        searchUser: PropTypes.func.isRequired,
        sendRequest: PropTypes.func.isRequired,
    }

    resetInputField = () => {
        this.props.searchUser(this.state.username);
    }

    handleChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onClick = (e) => {
        e.preventDefault();
        this.props.searchUser(this.state.username);
    }

    render () {
        const { classes } = this.props;
        return (
            <div>
                <h3>Search</h3>
                <form onSubmit={this.onClick}>
                    <TextField 
                    id="search" 
                    variant="outlined"
                    onChange={this.handleChange} 
                    value={this.state.username}
                    fullWidth
                    className={classes.input}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                    Search
                    </Button>
                </form>
                {
                this.props.users && this.props.users.map((user) => 
                    <User 
                    key={user.id}
                    user={user}
                    sendRequest={() => this.props.sendRequest(user.id)}
                    />
                )
            }
            
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    users: state.users.users,
})

export default connect(mapStateToProps, { searchUser, sendRequest })(withStyles(styles)(Search));