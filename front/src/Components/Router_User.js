import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Setting from 'Routes/User/Setting';

import Diagnose from './Router_Diagnose';
import Therapy from './Router_Therapy';
import Root from './Router_Root';
import Main from './Router_Main';

export default () => (
    <Router>
        <Switch>
            <Route path="/user/setting" component={Setting} />

            <Route path='/diagnose' component={Diagnose} />
            <Route path='/therapy' component={Therapy} />
            <Route path='/root' component={Root} />
            <Route path='/main' component={Main} />
            <Redirect from="*" to="/main/main" />
        </Switch>
    </Router>
)