import React, { Component } from 'react';
import RequestList from './RequestList';
import FriendList from './FriendList';
import Search from './Search';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
  root: {
    padding: '10px'
  }
});

export class Friends extends Component {
  state = {
    value: 0
  };

  handleChange = (e, newValue) => {
    this.setState({value: newValue});
  }

  render () {
      const { value } = this.state;
      const { classes } = this.props;
      return (
        <Paper square className={classes.root}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Friends" />
          <Tab label="Request List" />
          <Tab label="Search Friend" />
        </Tabs>
        {value === 0 && <FriendList/>}
        {value === 1 && <RequestList/>}
        {value === 2 && <Search/>}
      </Paper>
      );
  }
}

export default (withStyles(styles)(Friends));