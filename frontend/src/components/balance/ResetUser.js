import React, { useState } from 'react';

import CustomizedDialog from '../layout/Dialog';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import PersonIcon from '@material-ui/icons/Person';

export const ResetUser = ({ friend, reset }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

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
                secondary={friend.value + ' PLN'}
                />
                <ListItemSecondaryAction>
                {friend.value > 0 ?
                <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
                    <CheckIcon/>
                </IconButton>
                    : ''
                }
                </ListItemSecondaryAction>
            </ListItem>
            <CustomizedDialog
                open={open}
                title="Are you sure?"
                dialogContent={"Reset balance to user " + friend.username}
                onClose={handleClose}
                action={reset}
                button="Reset"
            />
        </List>
    )
}

export default ResetUser;