import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Signin from 'Routes/Root/SignIn';
import Signup from 'Routes/Root/SignUp';
import ForgotPassword from 'Routes/Root/ForgotPassword';
import AddStudent from 'Routes/Root/AddStudent';
import SelectIcon from 'Routes/Root/SelectIcon';
import SelectStudent from 'Routes/Root/SelectStudent';


import Diagnose from './Router_Diagnose';
import Therapy from './Router_Therapy';
import Main from './Router_Main';
import User from './Router_User';

export default () => (
    <Router>
        <Switch>
            <Route path='/root/signin' exact component={Signin} />
            <Route path='/root/signup' exact component={Signup} />
            <Route path='/root/forgotpassword' exact component={ForgotPassword} />
            <Route path='/root/addstd/:icon' exact component={AddStudent} />
            <Route path='/root/addstd' exact component={AddStudent} />
            <Route path='/root/selectstd/:student' exact component={SelectStudent} />
            <Route path='/root/selectstd' exact component={SelectStudent} />
            <Route path='/root/selecticon' exact component={SelectIcon} />


            <Route path='/diagnose' component={Diagnose} />
            <Route path='/therapy' component={Therapy} />
            <Route path='/main' component={Main} />
            <Route path='/user' component={User} />
            <Redirect from="*" to="/main/main" />
        </Switch>
    </Router>
)