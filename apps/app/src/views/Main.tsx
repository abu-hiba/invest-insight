import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Stock from './Stock'
import Markets from './Markets'
import NotFound from './NotFound'
import Profile from './Profile'
import SignIn from './SignIn'
import Registration from './Registration'

const Main = () => (
    <Switch>
        <Route path='/markets' component={Markets}/>
        <Route path='/stock' component={Stock}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/sign-in' component={SignIn}/>
        <Route path='/registration' component={Registration}/>
        <Route exact path='/' component={Home}/>
        <Route component={NotFound}/>
    </Switch>
)

export default Main
