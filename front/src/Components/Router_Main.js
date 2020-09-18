import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Main from 'Routes/Main/Main';
import SelectLearning from 'Routes/Main/SelectLearning';
import StdInfo from 'Routes/Main/StdInfo';
import Root from './Router';

export default () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Root} />
            <Route path="/main/main" exact component={Main} />
            <Route path="/main/select" exact component={SelectLearning} />
            <Route path="/main/stdinfo" exact component={StdInfo} />
            <Redirect from="*" to="/main/main" />
        </Switch>
    </Router>
)