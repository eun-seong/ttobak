
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Diagnose from './Router_Diagnose';
import Therapy from './Router_Therapy';
import TempMain from 'Routes/TempMain';

export default () => (
    <Router>
        <Switch>
            <Route path="/" exact component={TempMain} />
            <Route path="/diagnose" component={Diagnose} />
            <Route path="/therapy" component={Therapy} />
            <Redirect from="*" to="/" />
        </Switch>
    </Router>
)