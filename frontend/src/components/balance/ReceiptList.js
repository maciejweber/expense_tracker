import React, { Component } from 'react';
import Receipt from './Receipt';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getReceipts } from '../../actions/receipts';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
    container: {
      margin: '20px 0px'
    },
    input: {
      margin: '5px 0px',
      width: '100%'
    },
    submit: {
      margin: '10px 0px 0px 0px'
    }
  });

class ReceiptList extends Component {
    static propTypes = {
        receipts: PropTypes.array.isRequired,
        getReceipts: PropTypes.func.isRequired,
    }

    componentDidMount(){
        this.props.getReceipts();
    }

    render () {
        const { classes } = this.props;
        const { user } = this.props.auth;
        return (
            <div className={classes.container}>
                <h3>History</h3>
                {this.props.receipts.map((receipt) => <Receipt key={receipt.id} receipt={receipt} user={user}/>)}
            </div>
        );
    }
}

ReceiptList.propTypes = {
    classes: PropTypes.object.isRequired
  }


const mapStateToProps = (state) => ({
    receipts: state.receipts.receipts,
    auth: state.auth
})

export default connect(mapStateToProps, { getReceipts })(withStyles(styles)(ReceiptList));