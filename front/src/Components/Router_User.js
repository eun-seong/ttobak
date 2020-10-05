import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Setting from 'Routes/User/Setting';

import Diagnose from './Router_Diagnose';
import Therapy from './Router_Therapy';
import Root from './Router_Root';
import Main from './Router_Main';
import StdInfo from 'Routes/User/StdInfo';
import StdManaging from 'Routes/User/StdManaging';
import StdStatistics from 'Routes/User/StdStatistics';
import UserInfo from 'Routes/User/UserInfo';

export default () => (
    <Router>
        <Switch>
            <Route path='/user/setting' exact component={Setting} />
            <Route path='/user/stdinfo' exact component={StdInfo} />
            <Route path='/user/userinfo' exact component={UserInfo} />
            <Route path='/user/stdstatistics' exact component={StdStatistics} />
            <Route path='/user/stdmanaging' exact component={StdManaging} />

            <Route path='/diagnose' component={Diagnose} />
            <Route path='/therapy' component={Therapy} />
            <Route path='/root' component={Root} />
            <Route path='/main' component={Main} />
            <Redirect from="*" to="/main/main" />
        </Switch>
    </Router>
)