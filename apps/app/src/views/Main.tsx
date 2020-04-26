import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Stock from './Stock'
import Markets from './Markets'
import NotFound from './NotFound'
import Profile from './Profile'

const Main = () => (
    <Switch>
        <Route path='/markets' component={Markets}/>
        <Route path='/stock' component={Stock}/>
        <Route path='/profile' component={Profile}/>
        <Route exact path='/' component={Home}/>
        <Route component={NotFound}/>
    </Switch>
)

export default Main
