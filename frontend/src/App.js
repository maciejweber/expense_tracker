import React, { Fragment, Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import PrivateRoute from './components/common/PrivateRoute';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import Home from './components/layout/Home'
import CustomizedSnackbars from './components/layout/Snackbar';

class App extends Component{

  componentDidMount() {
    store.dispatch(loadUser());
  }
  render(){
  return (
    <Provider store={store}>
      <CustomizedSnackbars/>
      <Router>
        <Fragment>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute path="/" component={Home}/>
            </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
  }
}

export default App;
