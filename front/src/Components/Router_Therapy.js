import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Shadowing from 'Routes/Therapy/T1_Shadowing';
import Count from 'Routes/Therapy/T2_Count';
import Common from 'Routes/Therapy/T3_Common';
import Sound from 'Routes/Therapy/T5_Sound';
import Word from 'Routes/Therapy/T4_Word';
import ConsoMatch from 'Routes/Therapy/T6_ConsoMatch';
import ConsoCommon from 'Routes/Therapy/T7_ConsoCommon';

import Diagnose from './Router_Diagnose';
import Root from './Router_Root';
import Main from './Router_Main';
import User from './Router_User';

export default () => (
    <Router>
        <Switch>
            <Route path='/therapy/shadowing/:type/:s_id/:is_review/:is_selected' exect component={Shadowing} />
            <Route path='/therapy/count/:s_id/:is_review/:is_selected' exect component={Count} />
            <Route path='/therapy/common/:s_id/:is_review/:is_selected' exect component={Common} />
            <Route path='/therapy/word/:type/:s_id/:is_review/:is_selected' exect component={Word} />
            <Route path='/therapy/sound/:type/:s_id/:is_review/:is_selected' exect component={Sound} />
            <Route path='/therapy/consocommon/:s_id/:is_review/:is_selected' exect component={ConsoCommon} />
            <Route path='/therapy/consomatch/:s_id/:is_review/:is_selected' exect component={ConsoMatch} />

            <Route path='/diagnose' component={Diagnose} />
            <Route path='/root' component={Root} />
            <Route path='/main' component={Main} />
            <Route path='/user' component={User} />
            <Redirect from="*" to="/main/main" />
        </Switch>
    </Router>
)