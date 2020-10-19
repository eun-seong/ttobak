import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Recognition from 'Routes/Diagnose/Recognition';
import Attention from 'Routes/Diagnose/Attention';
import Sweep from 'Routes/Diagnose/Sweep';
import Result from 'Routes/Diagnose/Result';

import Therapy from './Router_Therapy';
import Root from './Router_Root';
import Main from './Router_Main';
import User from './Router_User';

export default () => (
    <Router>
        <Switch>
            <Route path='/diagnose/recognition/:s_id/:is_review' exect component={Recognition} />
            <Route path='/diagnose/attention/:s_id/:is_review' exect component={Attention} />
            <Route path='/diagnose/sweep/:s_id/:is_review' exect component={Sweep} />
            <Route path='/diagnose/result/:s_id' exect component={Result} />

            <Route path='/therapy' component={Therapy} />
            <Route path='/root' component={Root} />
            <Route path='/main' component={Main} />
            <Route path='/user' component={User} />

            <Redirect from="*" to="/main/main" />
        </Switch>
    </Router>
)