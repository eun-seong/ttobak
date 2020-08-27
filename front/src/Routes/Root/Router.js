
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import SignIn from 'Routes/Root/SignIn';
import TempMain from 'Routes/TempMain';

export default () => (
    <Router>
        <div>
            <Switch>
                <Route path="/" exact component={TempMain} />
                <Route path="/root/signin" component={SignIn} />
                <Redirect from="*" to="/" />
            </Switch>
        </div>
    </Router>
)