
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Diagnose from './Router_Diagnose';
import Therapy from './Router_Therapy';
import Root from './Router_Root';
import Main from './Router_Main';
import TempMain from 'Routes/TempMain';

const MainRouter = () => (
    <Router>
        <Switch>
            <Route path='/' exact component={TempMain} />
            <Route path='/diagnose' component={Diagnose} />
            <Route path='/therapy' component={Therapy} />
            <Route path='/root' component={Root} />
            <Route path='/main' component={Main} />
            <Redirect from='*' to='/' />
        </Switch>
    </Router>
)

export default MainRouter;