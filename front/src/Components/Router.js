
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import TempMain from 'Routes/TempMain';
import Diagnose from 'Routes/Diagnose/Router';
import Therapy from 'Routes/Therapy/Router';
import Root from 'Routes/Root/Router';

export default () => (
    <Router>
        <div>
            <Switch>
                <Route path="/" exact component={TempMain} />
                <Route path="/diagnose" component={Diagnose} />
                <Route path="/therapy" component={Therapy} />
                <Route path="/root" component={Root} />
                <Redirect from="*" to="/" />
            </Switch>
        </div>
    </Router>
)