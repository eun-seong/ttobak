import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Signin from 'Routes/Root/SignIn';
import Root from './Router';

export default () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Root} />
            <Route path="/root/signin" component={Signin} />
            <Redirect from="*" to="/" />
        </Switch>
    </Router>
)