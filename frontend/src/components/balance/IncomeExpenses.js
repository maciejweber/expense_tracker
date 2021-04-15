import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    box: {
        display: 'flex',
    },
    container:{
        flex: 1,
        textAlign: 'center',
        padding: '20px',
    },
    title: {
        fontWeight: 500,
        fontSize: 18
    },
    value_red: {
        color: 'red',
        fontSize: 16
    },
    value_green: {
        color: 'green',
        fontSize: 16
    },
});


class IncomeExpenses extends Component {
    
    render () {
        const { classes, receipts, auth } = this.props;

        const income_value = receipts.map((receipt) => {
            return receipt.author.id === auth.user.id ? 
            receipt.value * receipt.users.length : 0})

        const expense_value = receipts.map((receipt) => {
            return receipt.author.id !== auth.user.id ? 
            receipt.value * receipt.users.length : 0})

        const income = income_value
        .reduce((acc, item) => (acc += item), 0);
        
        const expense = expense_value
        .reduce((acc, item) => (acc += item), 0);
        

        return (
            <Box
            className={classes.box}
            boxShadow={3}
            bgcolor="background.paper"
          >
            <Box fontWeight={500} className={classes.container}>
                <Typography variant="h6" gutterBottom className={classes.title}>
                    INCOME
                </Typography>
                <Typography variant="h6" className={classes.value_green}>
                {income > 0 ? '+': ''}{income} PLN
                </Typography>
            </Box>
            <Box className={classes.container}>
                <Typography variant="h6" gutterBottom className={classes.title}>
                    EXPENSE
                </Typography>
                <Typography variant="h6" className={classes.value_red}>
                    {expense > 0 ? '-': ''}{expense} PLN
                </Typography>
            </Box>
          </Box>
        );
    }
}

const mapStateToProps = (state) => ({
    friends: state.friends.friends,
    receipts: state.receipts.receipts,
    auth: state.auth
})

export default connect(mapStateToProps)(withStyles(styles)(IncomeExpenses));