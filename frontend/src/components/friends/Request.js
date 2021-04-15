import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import PersonIcon from '@material-ui/icons/Person';
import CloseIcon from '@material-ui/icons/Close';

export const Request = ({ request, accept, reject }) => {
    return (
        <List>
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <PersonIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText
                primary={request.username}
                />
                <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="add" onClick={accept}>
                    <DoneIcon />
                </IconButton>
                <IconButton edge="end" aria-label="add" onClick={reject}>
                    <CloseIcon />
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    )
}
export default Request;