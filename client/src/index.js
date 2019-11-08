import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import AuthProvider from './context/AuthProvider.js'
import { BrowserRouter as Router} from 'react-router-dom'
import CrudProvider from './context/CrudProvider.js'

ReactDOM.render(
    <Router>
        <AuthProvider>
            <CrudProvider>
                <App />      
            </CrudProvider>
        </AuthProvider>
    </Router>, 
document.getElementById("root"))
