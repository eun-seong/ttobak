
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import SignIn from 'Routes/Root/SignIn';

export default () => (
    <Router>
        <div>
            <Switch>
                <Route path="/root/signin" component={SignIn} />
                <Redirect from="*" to="/" />
            </Switch>
        </div>
    </Router>
)