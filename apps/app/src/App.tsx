import React, { useState } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import AppShell from './components/AppShell'
import Main from './views/Main'
import { ProvideAuth } from './containers/AuthContext'

const App = () => (
    <Router>
        <ProvideAuth>
            <AppShell>
                <Main/>
            </AppShell>
        </ProvideAuth>
    </Router>
)

export default App
