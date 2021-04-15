import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import PersonIcon from '@material-ui/icons/Person';

export const Reject = ({ friend, reject }) => {
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
                <IconButton edge="end" aria-label="delete" onClick={reject} >
                    <RemoveIcon/>
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    )
}

export default Reject;