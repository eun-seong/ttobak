import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Common from 'Routes/Therapy/Common';
import ConsoCommon from 'Routes/Therapy/ConsoCommon';
import ConsoMatch from 'Routes/Therapy/ConsoMatch';
import ConsoSound from 'Routes/Therapy/ConsoSound';
import ConsoWord from 'Routes/Therapy/ConsoWord';
import Count from 'Routes/Therapy/Count';
import Poemtext from 'Routes/Therapy/Poemtext';
import VowelSound from 'Routes/Therapy/VowelSound';
import VowelWord from 'Routes/Therapy/VowelWord';

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
            <Route path='/therapy/consosound' exect component={ConsoSound} />
            <Route path='/therapy/consoword' exect component={ConsoWord} />
            <Route path='/therapy/count' exect component={Count} />
            <Route path='/therapy/poemtext' exect component={Poemtext} />
            <Route path='/therapy/vowelsound' exect component={VowelSound} />
            <Route path='/therapy/vowelword' exect component={VowelWord} />

            <Route path='/diagnose' component={Diagnose} />
            <Route path='/root' component={Root} />
            <Route path='/main' component={Main} />
            <Route path='/user' component={User} />
            <Redirect from="*" to="/main/main" />
        </Switch>
    </Router>
)