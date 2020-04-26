import React from 'react'
import { Switch, Route } from 'react-router-dom'

const Stock = () => (
    <Switch>
        <Route  path='/stock' component={() => <>STOCK</>}/>
        <Route path='/stock/ticker' component={() => <>COMING SOON</>}/>
    </Switch> 
)

export default Stock
