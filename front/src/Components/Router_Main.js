import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Main from 'Routes/Main/Main';
import SelectLearning from 'Routes/Main/SelectLearning';
import LoadingComp from 'Components/LoadingComp';

import Diagnose from './Router_Diagnose';
import Therapy from './Router_Therapy';
import Root from './Router_Root';
import User from './Router_User';

export default () => (
    <Router>
        <Switch>
            <Route path='/main/select' exact component={SelectLearning} />
            <Route path='/main/main' exact component={Main} />
            <Route path='/main/loading' exact component={LoadingComp} />

            <Route path='/diagnose' component={Diagnose} />
            <Route path='/therapy' component={Therapy} />
            <Route path='/root' component={Root} />
            <Route path='/user' component={User} />
            <Redirect from="*" to="/main/main" />
        </Switch>
    </Router>
)