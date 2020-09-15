import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Main from 'Routes/Main/Main';
import Root from './Router';

export default () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Root} />
            <Route path="/main/main" exact component={Main} />
            <Redirect from="*" to="/" />
        </Switch>
    </Router>
)