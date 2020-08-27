import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Recognition from 'Routes/Diagnose/Recognition';
import Attention from 'Routes/Diagnose/Attention';
import Sweep from 'Routes/Diagnose/Sweep';
import Result from 'Routes/Diagnose/Result';
import Root from './Router';

export default () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Root} />
            <Route path="/diagnose/recognition" component={Recognition} />
            <Route path="/diagnose/attention" component={Attention} />
            <Route path="/diagnose/sweep" component={Sweep} />
            <Route path="/diagnose/result" component={Result} />
            <Redirect from="*" to="/" />
        </Switch>
    </Router>
)