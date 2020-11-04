import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Shadowing from 'Routes/Therapy/T1_Shadowing';
import Self from 'Routes/Therapy/T1_Self';
import Count from 'Routes/Therapy/T2_Count';
import Common from 'Routes/Therapy/T3_Common';
import Word from 'Routes/Therapy/T4_Word';
import Sound from 'Routes/Therapy/T5_Sound';
import ConsoMatch from 'Routes/Therapy/T6_ConsoMatch';
import ConsoCommon from 'Routes/Therapy/T7_ConsoCommon';

import Diagnose from './Router_Diagnose';
import Root from './Router_Root';
import Main from './Router_Main';
import User from './Router_User';

export default () => (
    <Router>
        <Switch>
            <Route path='/therapy/poem/:learning_type' exect component={Shadowing} />
            <Route path='/therapy/word/:type/:learning_type' exect component={Word} />
            <Route path='/therapy/selfpoem/:learning_type' exect component={Self} />
            <Route path='/therapy/count/:learning_type' exect component={Count} />
            <Route path='/therapy/common/:learning_type' exect component={Common} />
            <Route path='/therapy/sound/:type/:learning_type' exect component={Sound} />
            <Route path='/therapy/consocommon/:learning_type' exect component={ConsoCommon} />
            <Route path='/therapy/consomatch/:learning_type' exect component={ConsoMatch} />

            <Route path='/diagnose' component={Diagnose} />
            <Route path='/root' component={Root} />
            <Route path='/main' component={Main} />
            <Route path='/user' component={User} />
            <Redirect from="*" to="/main/main" />
        </Switch>
    </Router>
)