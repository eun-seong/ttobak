import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Counting from 'Routes/Therapy/Counting';
import Phoneme from 'Routes/Therapy/Phoneme';
import Shadowing from 'Routes/Therapy/Shadowing';

import Diagnose from './Router_Diagnose';
import Root from './Router_Root';
import Main from './Router_Main';
import User from './Router_User';

export default () => (
    <Router>
        <Switch>
            <Route path='/therapy/counting' exect component={Counting} />
            <Route path='/therapy/phoneme' exect component={Phoneme} />
            <Route path='/therapy/shadowing' exect component={Shadowing} />

            <Route path='/diagnose' component={Diagnose} />
            <Route path='/root' component={Root} />
            <Route path='/main' component={Main} />
            <Route path='/user' component={User} />
            <Redirect from="*" to="/main/main" />
        </Switch>
    </Router>
)