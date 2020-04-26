import React, { useState } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import AppShell from './components/AppShell'
import Main from './views/Main'

const App = () => (
    <Router>
        <AppShell>
            <Main/>
        </AppShell>
    </Router>
)

export default App
