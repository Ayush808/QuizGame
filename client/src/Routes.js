import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './components/Home'
import Dashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import TestPreInfo from './components/TestPreInfo'
import Quiz from './components/Quiz'
import Leaderboard from './components/Leaderboard'
import AddQuestion from './components/CreateQuestion'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'


const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/signin' exact component={Signin} />
                    <Route path='/signup' exact component={Signup} />
                    <Route path="/" exact component={Home} />
                    <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
                    <PrivateRoute path='/testlink' exact component={TestPreInfo} />
                    <PrivateRoute path='/starttest' exact component={Quiz} />
                    <PrivateRoute path='/leaderboard' exact component={Leaderboard} />
                    <AdminRoute path='/admin/question/create' exact component={AddQuestion} />
                    <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes