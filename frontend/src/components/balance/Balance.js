import React, { Component, Fragment } from 'react';
import ReceiptList from './ReceiptList';
import AddReceipt from './AddReceipt';
import IncomeExpenses from './IncomeExpenses';
import ResetList from './ResetList';

export class Balance extends Component {
    render () {
        return (
            <Fragment>
            <IncomeExpenses/>
            <AddReceipt />
            <ReceiptList />
            <ResetList />
            </Fragment>
        );
    }
}

export default Balance;