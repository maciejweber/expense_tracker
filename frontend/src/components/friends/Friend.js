import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMessage } from '../../actions/message';
import CustomizedDialog from '../layout/Dialog';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import PersonIcon from '@material-ui/icons/Person';

class Friend extends Component{
    state = {
        open: false
    }

    handleClickOpen = () => {
        const user_value = this.props.balance.filter((balance) => balance.id === this.props.friend.id)[0].value
        console.log(user_value);
        if(user_value === 0){
            this.setState({open: true});
        } else {
            this.props.createMessage("Your balance with this user should be 0", "error", true);
        }
    }

    handleClose = () => {
        this.setState({open:false});
    }

    render (){
    const {friend, remove} = this.props;
    return (
        <List>
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <PersonIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText
                primary={friend.username}
                />
                <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={this.handleClickOpen} >
                    <RemoveIcon/>
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <CustomizedDialog
                open={this.state.open}
                title="Are you sure?"
                dialogContent={"Delete friend " + friend.username}
                onClose={this.handleClose}
                action={remove}
                button="Delete"
            />
        </List>
    )}
}

const mapStateToProps = (state) => ({
    balance: state.balance.balance
});


export default connect(mapStateToProps,{createMessage})(Friend);