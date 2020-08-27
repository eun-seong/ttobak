import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Counting from 'Routes/Therapy/Counting';
import Phoneme from 'Routes/Therapy/Phoneme';
import Shadowing from 'Routes/Therapy/Shadowing';
import SignIn from 'Routes/Root/SignIn';
import Root from './Router';

export default () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Root} />
            <Route path="/therapy/counting" component={Counting} />
            <Route path="/therapy/phoneme" component={Phoneme} />
            <Route path="/therapy/shadowing" component={Shadowing} />
            <Route path="/root/signin" component={SignIn} />
            <Redirect from="*" to="/" />
        </Switch>
    </Router>
)