import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Common from 'Routes/Therapy/T3_Common';
import ConsoCommon from 'Routes/Therapy/T7_ConsoCommon';
import ConsoMatch from 'Routes/Therapy/T6_ConsoMatch';
import Sound from 'Routes/Therapy/T5_Sound';
import Word from 'Routes/Therapy/T4_Word';
import Count from 'Routes/Therapy/T2_Count';
import Poemtext from 'Routes/Therapy/T1_Poemtext';

import Diagnose from './Router_Diagnose';
import Root from './Router_Root';
import Main from './Router_Main';
import User from './Router_User';

export default () => (
    <Router>
        <Switch>
            <Route path='/therapy/common' exect component={Common} />
            <Route path='/therapy/consocommon' exect component={ConsoCommon} />
            <Route path='/therapy/consomatch' exect component={ConsoMatch} />
            <Route path='/therapy/sound/:type' exect component={Sound} />
            <Route path='/therapy/word/:type' exect component={Word} />
            <Route path='/therapy/count' exect component={Count} />
            <Route path='/therapy/poemtext' exect component={Poemtext} />

            <Route path='/diagnose' component={Diagnose} />
            <Route path='/root' component={Root} />
            <Route path='/main' component={Main} />
            <Route path='/user' component={User} />
            <Redirect from="*" to="/main/main" />
        </Switch>
    </Router>
)