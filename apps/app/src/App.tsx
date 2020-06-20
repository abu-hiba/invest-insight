import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import AppShell from './components/AppShell'
import Main from './views/Main'
import { ProvideAuth } from './containers/AuthContext'
import { ProvideIDB } from './containers/IDBContext'

const App = () => (
    <Router>
        <ProvideAuth>
            <ProvideIDB>
                <AppShell>
                    <Main/>
                </AppShell>
            </ProvideIDB>
        </ProvideAuth>
    </Router>
)

export default App
