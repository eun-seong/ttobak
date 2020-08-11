
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import TempMain from 'Routes/TempMain';
import Recognition from 'Routes/Diagnose/Recognition';
import Attention from 'Routes/Diagnose/Attention';
import Sweep from 'Routes/Diagnose/Sweep';
import Result from 'Routes/Diagnose/Result';
import Counting from 'Routes/Therapy/Counting';
import Phoneme from 'Routes/Therapy/Phoneme';
import Shadowing from 'Routes/Therapy/Shadowing';

export default () => (
    <Router>
        <div>
            <Switch>
                <Route path="/" exact component={TempMain} />
                <Route path="/diagnose/recognition" component={Recognition} />
                <Route path="/diagnose/attention" component={Attention} />
                <Route path="/diagnose/sweep" component={Sweep} />
                <Route path="/diagnose/result" component={Result} />
                <Route path="/therapy/counting" component={Counting} />
                <Route path="/therapy/phoneme" component={Phoneme} />
                <Route path="/therapy/shadowing" component={Shadowing} />
                <Redirect from="*" to="/" />
            </Switch>
        </div>
    </Router>
)