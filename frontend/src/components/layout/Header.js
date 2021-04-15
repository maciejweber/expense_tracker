import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { logout } from '../../actions/auth';
import {AppBar, Toolbar, Typography, Button, Container, Box} from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const styles = theme => ({
    typographyStyles: {
        flex: 1
    },
});

export class Header extends Component {
    state = {
        page: 'list'
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    render(){
        const {classes} = this.props;
        const { isAuthenticated, user } = this.props.auth;

        return(
            <AppBar position="static">
                <Container maxWidth="lg">
                <Toolbar className={classes.toolbar}>
                    <Typography component={'span'} className={classes.typographyStyles}>
                        <Box fontWeight="fontWeightBold" m={1}  letterSpacing={3}>
                            Expense Tracker
                        </Box>
                    </Typography>
                    <Typography component={'span'}>
                    <Box fontWeight="500" m={1}>
                        Welcome, {user.username}
                    </Box>
                    </Typography>
                    <Button component={Link} to={'/'} color="secondary">Balance</Button>
                    <Button component={Link} to={'/friends'} color="secondary">Friends</Button>
                    { isAuthenticated ? 
                    <Button onClick={this.props.logout} color="inherit">
                        Logout
                    </Button>
                    : ''
                    }
                </Toolbar>
                </Container>
            </AppBar>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
  });

export default connect(mapStateToProps, { logout })(withStyles(styles)(Header));
// withStyles(styles)