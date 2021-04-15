import React, { Fragment } from 'react';
import Balance from '../balance/Balance';
import Friends from '../friends/Friends';
import Header from './Header';
import PrivateRoute from '../common/PrivateRoute';

import "../../index.css";


export default function Home(){
    return (
        <Fragment>
            <Header />
            <div className="container">
                <PrivateRoute exact path="/" component={Balance}/>
                <PrivateRoute path="/friends" component={Friends}/>
            </div>
        </Fragment>
    )
}