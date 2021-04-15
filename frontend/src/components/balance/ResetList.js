import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBalance } from '../../actions/balance';
import { resetBalance } from '../../actions/balance';
import ResetUser from './ResetUser';

import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
    container: {
      margin: '20px 0px'
    }
  });

class ResetList extends Component {
    static propTypes = {
        balance: PropTypes.array.isRequired,
        getBalance: PropTypes.func.isRequired,
        resetBalance: PropTypes.func.isRequired,
    }

    componentDidMount(){
        this.props.getBalance();
    }

    onClick = (e, id) => {
        console.log(id);
        this.props.resetBalance(id);
    }

    render () {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <h3>Balance</h3>
                {this.props.balance.map((user) => 
                    <ResetUser 
                    key={user.id} 
                    friend={user}
                    reset={(e) => this.onClick(e,user.id)}/>
                )}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    balance: state.balance.balance
})


export default connect(mapStateToProps, { getBalance, resetBalance })(withStyles(styles)(ResetList));

