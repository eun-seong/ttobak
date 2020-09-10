import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Signin from 'Routes/Root/SignIn';
import Signup from 'Routes/Root/SignUp';
import ForgotPassword from 'Routes/Root/ForgotPassword';
import AddStudent from 'Routes/Root/AddStudent';
import Root from './Router';

export default () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Root} />
            <Route path="/root/signin" component={Signin} />
            <Route path="/root/signup" component={Signup} />
            <Route path="/root/forgotpassword" component={ForgotPassword} />
            <Route path="/root/addstd" component={AddStudent} />
            <Redirect from="*" to="/" />
        </Switch>
    </Router>
)